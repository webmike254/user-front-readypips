package com.twiga.dialer.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "orders")
data class Order(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val customerName: String,
    val total: Double,
    val status: String = "New",
    val createdAt: Long = System.currentTimeMillis()
)