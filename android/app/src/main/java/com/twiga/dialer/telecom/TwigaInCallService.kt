package com.twiga.dialer.telecom

import android.telecom.Call
import android.telecom.InCallService

class TwigaInCallService : InCallService() {
    override fun onCallAdded(call: Call) {
        super.onCallAdded(call)
        // Launch incoming call UI
    }

    override fun onCallRemoved(call: Call) {
        super.onCallRemoved(call)
    }
}