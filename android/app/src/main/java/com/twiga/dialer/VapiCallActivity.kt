package com.twiga.dialer

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import ai.vapi.Vapi

class VapiCallActivity : AppCompatActivity() {
    private lateinit var vapi: Vapi

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vapi_call)

        vapi = Vapi(publicKey = "605ebb25-4c52-4e85-bbb7-95aa65e7a2a0")
        vapi.start(
            assistantId = "84b009c6-0634-44e2-9861-13d746e82542",
            assistantOverrides = mapOf(
                "firstMessage" to "[cheerfully] Hello! How can I help you today?",
                "model" to mapOf("provider" to "openai", "model" to "gpt-4o"),
                "voice" to mapOf("provider" to "11labs", "voiceId" to "EXAVITQu4vr4xnSDxMaL", "model" to "eleven_v3")
            )
        )
    }

    override fun onDestroy() {
        super.onDestroy()
        vapi.stop()
    }
}