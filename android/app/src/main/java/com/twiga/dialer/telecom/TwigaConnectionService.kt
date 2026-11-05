package com.twiga.dialer.telecom

import android.telecom.Connection
import android.telecom.ConnectionRequest
import android.telecom.ConnectionService
import android.telecom.PhoneAccountHandle

class TwigaConnectionService : ConnectionService() {
    override fun onCreateOutgoingConnection(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ): Connection {
        val connection = TwigaConnection()
        connection.setAddress(request?.address, Connection.PRESENTATION_ALLOWED)
        connection.setInitializing()
        connection.setActive()
        return connection
    }

    override fun onCreateIncomingConnection(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ): Connection {
        val connection = TwigaConnection()
        connection.setAddress(request?.address, Connection.PRESENTATION_ALLOWED)
        connection.setRinging()
        return connection
    }
}