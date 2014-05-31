package com.sis.bandar.utils;

import java.io.File;
import java.io.FileOutputStream;

import android.content.Context;
import android.os.Environment;
import android.webkit.JavascriptInterface;

/**
 * performs file operation in android device
 * @author sumit
 *
 */
public class FileOperationInterface {
	private Context context;
	
	public FileOperationInterface(Context c) {
		setContext(c);
	}
	
	@JavascriptInterface
	public void writeFile(String fileName, String content, String type) {
		
		// create directories
		File sdCard = Environment.getExternalStorageDirectory();
		File dir = new File (sdCard.getAbsolutePath() + "/bandar/" + type);
		if (!dir.exists()) {
			dir.mkdirs();
		}

		try {
			File file = new File(dir, fileName);
			FileOutputStream outputStream = new FileOutputStream(file);
			outputStream.write(content.getBytes());
			outputStream.close();
		} catch (Exception e) {
		  e.printStackTrace();
		}		
	}

	public Context getContext() {
		return context;
	}

	public void setContext(Context context) {
		this.context = context;
	}
}
