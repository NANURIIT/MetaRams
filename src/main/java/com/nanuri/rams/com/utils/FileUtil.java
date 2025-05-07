package com.nanuri.rams.com.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.nanuri.rams.com.dto.FileDTO;
import com.nanuri.rams.com.exception.FileException;

@Component
public class FileUtil {

	 @Value("${file.upload-path}")
	 private String uploadPath;
	 
    /** 오늘 날짜 */
    private final String today = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

    /** 업로드 경로 */
    private final String windowsPath = Paths.get("C:", "develop", "rams-files", today).toString();
    private final String linuxPath = Paths.get("/", "home", "nanuri", "rams-files", today).toString();
    private final String macPath = Paths.get(System.getProperty("user.home"), "rams-files", today).toString();

    /**
     * 서버에 생성할 파일명을 처리할 랜덤 문자열 반환
     * 
     * @return 랜덤 문자열
     */
    private final String getRandomString() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    /**
     * 서버에 첨부 파일을 생성하고, 업로드 파일 목록 반환
     * 
     * @param files - 파일 Array
     * @return 업로드 파일 목록
     */
    public List<FileDTO> uploadFiles(MultipartFile[] files) {
        if (files[0].getSize() < 1) {
            return Collections.emptyList();
        }
        List<FileDTO> attachList = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                FileDTO attach = uploadFile(file);
                attachList.add(attach);
            } catch (Exception e) {
                throw new FileException("[" + file.getOriginalFilename() + "] failed to save");
            }
        }

        return attachList;
    }

    /**
     * 서버에 첨부 파일을 생성하고, 업로드 파일 목록 반환
     * 
     * @param file - 파일
     * @return 업로드 파일 정보
     */
    public FileDTO uploadFile(MultipartFile file) {

        String uploadPath = makePath();
        FileDTO attach = new FileDTO();

        try {
            final String extension = FilenameUtils.getExtension(file.getOriginalFilename());
            final String saveName = getRandomString() + "." + extension;

            File filePath = new File(uploadPath).getAbsoluteFile();  // 절대경로 보정
            if (!filePath.exists()) {
            	filePath.mkdirs();
            }
            
            File target = new File(filePath, saveName);
            file.transferTo(target);

            attach.setServerPath(uploadPath);
            attach.setOriginalName(file.getOriginalFilename());
            attach.setSaveName(saveName);
            attach.setSize(file.getSize());
            attach.setRgstDt(DateUtil.changeDateFormat(today, "yyyy-MM-dd"));

        } catch (IOException e) {
            throw new FileException("[" + file.getOriginalFilename() + "] failed to save");
        } catch (Exception e) {
            throw new FileException("[" + file.getOriginalFilename() + "] failed to save");
        }

        return attach;
    }

    /**
     * 파일 삭제
     * 
     * @param serverPath
     * @param saveName
     * @return boolean
     */
    public static boolean deleteFile(String serverPath, String saveName) {

        File file = new File(serverPath, saveName);

        boolean result = file.delete();

        return result;
    }

    /**
     * 서버에 디렉토리를 생성
     * 
     * @return String uploadPath
     */
    private String makePath() {
//        String uploadPath = "";
//        File dir = null;
//        String osName = System.getProperty("os.name").toLowerCase();
//
//        if (osName.contains("windows")) {
//            dir = new File(windowsPath);
//            uploadPath = windowsPath;
//        } else if (osName.contains("mac")) {
//            dir = new File(macPath);
//            uploadPath = macPath;
//        } else {
//            dir = new File(linuxPath);
//            uploadPath = linuxPath;
//        }
//
//        if (dir.exists() == false) {
//            dir.mkdirs();
//        }
    	
    	System.out.println("uploadPath::" + uploadPath);
    	File dir = new File(uploadPath);
    	
    	System.out.println("dir::" + dir);
    	
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return uploadPath;
    }

}
