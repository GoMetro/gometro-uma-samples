package com.ydangleapps.gometrosampleapp

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.ydangleapps.gometro.client.GoMetro
import com.ydangleapps.gometro.internal.TAG
import io.reactivex.disposables.CompositeDisposable

class MainActivity : AppCompatActivity() {

  private lateinit var goMetro: GoMetro

  private val disposable = CompositeDisposable()

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    // get GoMetro instance
    goMetro = GoMetro.shared
  }

  override fun onResume() {
    super.onResume()

    // initialize the GoMetro SDK
    disposable.add(
      goMetro.init(
        this,
        MainActivity::class.java.canonicalName ?: "",
        "this-is-a-token"
      )
        .subscribe({
          Log.i(TAG, "SM and Mobidot SDKs started")
        }, {
          Log.e(TAG, it.message!!)
        })
    )
  }

  override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
  ) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    goMetro.onRequestPermissionsResult(
      requestCode,
      permissions,
      grantResults
    )
  }

  override fun onDestroy() {
    super.onDestroy()
    disposable.dispose()
  }
}
