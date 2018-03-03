package com.fr.perso.mybank.service.impl;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

	public static final String OUTPUT_UPLOAD_DIRECTORY = "/home/mathieu/programmation/workspaces/MyBankAnalytics/MyBankAnalytics/tmp/";
	
	public File storeFileInDownloadDirectory( MultipartFile file ) {
	
		if( file != null ) {
			File destinationFile = new File( OUTPUT_UPLOAD_DIRECTORY + file.getOriginalFilename() );
			int i = 0;
			while( destinationFile.exists() ) {
				destinationFile = new File( OUTPUT_UPLOAD_DIRECTORY + "-" + i + "-" + file.getOriginalFilename() );
				i++;
			}
			try {
				file.transferTo( destinationFile );
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				return null;
			}
			return destinationFile;
		}
		else {
			return null;
		}
		
	}
	
}
