export class MicCapture {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  onChunk: ((pcm16: Int16Array, level: number) => void) | null = null;
  onLevel: ((level: number) => void) | null = null;

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    this.ctx = new AudioContext({ sampleRate: 16000 });
    this.source = this.ctx.createMediaStreamSource(this.stream);
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.source.connect(this.analyser);
    this.processor = this.ctx.createScriptProcessor(4096, 1, 1);
    this.source.connect(this.processor);
    this.processor.connect(this.ctx.destination);
    this.processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      // compute level
      let sum = 0;
      for (let i = 0; i < input.length; i++) sum += input[i] * input[i];
      const rms = Math.sqrt(sum / input.length);
      const level = Math.min(1, rms * 4);
      this.onLevel?.(level);
      // downsample to 16k if needed (ctx already 16k) and convert to PCM16
      const pcm = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
      this.onChunk?.(pcm, level);
    };
  }

  getAnalyser() {
    return this.analyser;
  }

  stop() {
    this.processor?.disconnect();
    this.source?.disconnect();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.ctx?.close();
    this.processor = null;
    this.source = null;
    this.stream = null;
    this.ctx = null;
    this.analyser = null;
  }
}

export class AudioPlayer {
  private ctx: AudioContext;
  private queue: AudioBuffer[] = [];
  private playing = false;
  private current: AudioBufferSourceNode | null = null;

  constructor() {
    this.ctx = new AudioContext();
  }

  async enqueuePcm16(pcm: Int16Array, sampleRate = 24000) {
    const float = new Float32Array(pcm.length);
    for (let i = 0; i < pcm.length; i++) float[i] = pcm[i] / 32768;
    const buf = this.ctx.createBuffer(1, float.length, sampleRate);
    buf.copyToChannel(float, 0);
    this.queue.push(buf);
    if (!this.playing) this.playNext();
  }

  async enqueueArrayBuffer(buf: ArrayBuffer, mime = "audio/mpeg") {
    // try decode
    try {
      const ab = await this.ctx.decodeAudioData(buf.slice(0));
      this.queue.push(ab);
      if (!this.playing) this.playNext();
    } catch {
      // ignore
    }
  }

  private playNext() {
    const buf = this.queue.shift();
    if (!buf) {
      this.playing = false;
      return;
    }
    this.playing = true;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(this.ctx.destination);
    src.onended = () => {
      this.current = null;
      this.playNext();
    };
    this.current = src;
    src.start();
  }

  stop() {
    try { this.current?.stop(); } catch {}
    this.current = null;
    this.queue = [];
    this.playing = false;
  }

  isPlaying() {
    return this.playing;
  }
}