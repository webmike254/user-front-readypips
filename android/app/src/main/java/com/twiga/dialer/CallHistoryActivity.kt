package com.twiga.dialer

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class CallHistoryActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simple)
        title = "Call History"
    }
}