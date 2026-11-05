package com.twiga.dialer.telecom

import android.telecom.Connection

class TwigaConnection : Connection() {
    override fun onAnswer() {
        setActive()
    }

    override fun onReject() {
        setDisconnected(android.telecom.DisconnectCause(android.telecom.DisconnectCause.REJECTED))
        destroy()
    }

    override fun onDisconnect() {
        setDisconnected(android.telecom.DisconnectCause(android.telecom.DisconnectCause.LOCAL))
        destroy()
    }

    override fun onAbort() {
        setDisconnected(android.telecom.DisconnectCause(android.telecom.DisconnectCause.CANCELED))
        destroy()
    }
}