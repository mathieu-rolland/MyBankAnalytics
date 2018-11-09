package com.fr.perso.mybank.service.impl;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

	@Value("${bank.file.upload.path}")
	public String outputUploadDirectory;
	
	public File storeFileInDownloadDirectory( MultipartFile file ) {
	
		if( file != null ) {
			File destinationFile = new File( outputUploadDirectory + file.getOriginalFilename() );
			int i = 0;
			while( destinationFile.exists() ) {
				destinationFile = new File( outputUploadDirectory + "-" + i + "-" + file.getOriginalFilename() );
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
