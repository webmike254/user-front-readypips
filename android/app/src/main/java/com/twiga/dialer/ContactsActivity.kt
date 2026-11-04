package com.twiga.dialer

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class ContactsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simple)
        title = "Contacts"
    }
}