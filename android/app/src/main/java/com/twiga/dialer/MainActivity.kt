package com.twiga.dialer

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.telecom.TelecomManager
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val numberInput = findViewById<EditText>(R.id.numberInput)
        val callButton = findViewById<Button>(R.id.callButton)
        val vapiButton = findViewById<Button>(R.id.vapiButton)

        callButton.setOnClickListener {
            val number = numberInput.text.toString()
            if (number.isNotEmpty()) {
                val intent = Intent(Intent.ACTION_CALL, Uri.parse("tel:$number"))
                startActivity(intent)
            }
        }

        vapiButton.setOnClickListener {
            startActivity(Intent(this, VapiCallActivity::class.java))
        }

        val telecomManager = getSystemService(TelecomManager::class.java)
        if (telecomManager?.defaultDialerPackage != packageName) {
            val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
            intent.putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, packageName)
            startActivity(intent)
        }
    }
}