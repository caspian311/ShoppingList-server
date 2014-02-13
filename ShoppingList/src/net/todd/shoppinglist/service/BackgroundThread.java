package net.todd.shoppinglist.service;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

public class BackgroundThread extends Thread {
	private static final String TAG = BackgroundThread.class.toString();
	private Handler handler;
	private Looper myLooper;

	public Handler getHandler() {
		return handler;
	}
	
	@Override
	public void run() {
		Log.i(TAG, "Background thread starting up");
		try {
			Looper.prepare();
			
			handler = new Handler();
			myLooper = Looper.myLooper();
			
			Looper.loop();
		} catch (Exception e) {
			Log.e(TAG, "Looper died: " + e.getMessage());
		}
		Log.i(TAG, "Background thread finished");
	}
	
	public void quit() {
		myLooper.quit();
	}
}
