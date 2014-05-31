package com.sis.bandar.utils;

import java.io.IOException;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.webkit.JavascriptInterface;

/**
 * this class creates an interface to play sound
 * @author sumit
 *
 */
public class AudioInterface {
	private Context context;

	public AudioInterface(Context c) {
		context = c;
	}

	@JavascriptInterface
	public void playAudio(String aud) {

		try {
			// get audio file
			AssetFileDescriptor fileDescriptor = context.getAssets().openFd(aud);
			
			// create a media player
			MediaPlayer mp = new MediaPlayer();
			mp.setDataSource(fileDescriptor.getFileDescriptor(), 
			fileDescriptor.getStartOffset(), 
			fileDescriptor.getLength());
			fileDescriptor.close();
			mp.prepare();
			mp.start();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
	}
}