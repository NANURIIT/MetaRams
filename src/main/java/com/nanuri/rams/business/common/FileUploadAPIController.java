package com.nanuri.rams.business.common;

import java.io.File;
import java.io.IOException;
import java.net.Authenticator;
import java.net.URLEncoder;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.vo.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nanuri.rams.com.dto.FileDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.FileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/FileUpload")
@RequiredArgsConstructor
@RestController
public class FileUploadAPIController {

	private final AuthenticationFacade facade;

	private final FileUploadService FileUploadervice;

	@Autowired
	private FileUtil fileUtils;

	// -----------------------TAB1 관리이력-----------------------//

	// 파일업로드
	@PostMapping(value = "/uploadCmFile")
	public FileUploadDTO uploadFile(
			@RequestParam("uploadfile") MultipartFile uploadfile
			// , @RequestParam(value = "fileKey1", required=false) String fileKey1
			, @RequestParam(value = "fileKey2", required = false) String fileKey2
			, @RequestParam(value = "ScrnMenuId", required = false) String ScrnMenuId
			) {

		/*
		 * if(StringUtil.isNullOrEmpty(lstCCaseCcd)) { LocalDateTime today =
		 * LocalDateTime.now(); DateTimeFormatter date =
		 * DateTimeFormatter.ofPattern("yyMMddHHmmss"); ibDealNo = today.format(date); }
		 * if(StringUtil.isNullOrEmpty(riskInspctCcd)) { riskInspctCcd = "99"; }
		 * if(StringUtil.isNullOrEmpty(lstCCaseCcd)) { lstCCaseCcd = "99"; }
		 */

		FileDTO fileInfo = fileUtils.uploadFile(uploadfile);

		FileUploadDTO dto = new FileUploadDTO();

		// GUID 세팅
		UUID fileKey1 = UUID.randomUUID();

		dto.setFileKey1(fileKey1.toString());
		dto.setFileKey2(fileKey2);
		dto.setSvFilePathNm(fileInfo.getServerPath());
		dto.setSvFileNm(fileInfo.getSaveName());
		String[] arrExpn = fileInfo.getOriginalName().split("\\.");
		log.debug(arrExpn.length + "");
		dto.setSvFileExpnsnNm(arrExpn[arrExpn.length - 1]);
		dto.setSvFileSz(fileInfo.getSize());
		dto.setScrnMenuId(null);
		dto.setOrgFileNm(fileInfo.getOriginalName());
		// dto.setRgstDt(fileInfo.getRgstDt());
		dto.setScrnMenuId(ScrnMenuId);

		FileUploadervice.registFileInfo(dto);

		return dto;
	}

	// 파일삭제
	@GetMapping(value = "/deleteCmFile")
	public List<FileUploadDTO> removeFile(
			@RequestParam(value = "fileKey1[]", required = false) List<String> fileKey1,
			@RequestParam(value = "fileKey2", required = false) String fileKey2,
			@RequestParam(value = "ScrnMenuId", required = false) String ScrnMenuId) {
		// log.debug("File delete Start!!! ==> " + fileKey1);
		// log.debug("File delete Start!!! ==> " + fileKey1.size());

		// vo.setFileKey2(fileKey2);
		// vo.setArratchFleSn(arratchFleSn);

		FileUploadVO vo = new FileUploadVO();

		// 서버에 파일 삭제
		for (int i = 0; i < fileKey1.size(); i++) {
			FileUploadDTO dto = new FileUploadDTO();
			dto.setFileKey1(fileKey1.get(i));
			dto.setHndlDprtCd(facade.getDetails().getDprtCd());
			dto.setHndlPEno(facade.getDetails().getEno());
			FileUploadervice.deleteFileInfo(dto);

			vo.setFileKey1(fileKey1.get(i));
			vo.setDelYn("Y");

			List<FileUploadDTO> delFiles = FileUploadervice.getListFileInfo(vo);

			FileUtil.deleteFile(delFiles.get(i).getSvFilePathNm(), delFiles.get(i).getSvFileNm());
		}

		vo = new FileUploadVO();

		vo.setFileKey2(fileKey2);
		vo.setScrnMenuId(ScrnMenuId);
		vo.setDelYn("N");

		List<FileUploadDTO> list = FileUploadervice.getListFileInfo(vo);

		return list;
	}

	// 파일목록 조회
	@GetMapping(value = "/getCmFiles")
	public List<FileUploadDTO> getFileList(
			// @RequestParam(value = "fileKey1", required=false) String fileKey1
			@RequestParam(value = "fileKey2", required = false) String fileKey2
			, @RequestParam(value = "ScrnMenuId", required = false) String ScrnMenuId
			) {

		FileUploadVO vo = new FileUploadVO();
		// vo.setFileKey1(fileKey1);
		vo.setFileKey2(fileKey2);
		vo.setScrnMenuId(ScrnMenuId);
		vo.setDelYn("N");

		List<FileUploadDTO> list = FileUploadervice.getListFileInfo(vo);

		return list;
	}

	// 파일다운로드
	@GetMapping(value = "/downloadFile")
	public void downloadFile(@RequestParam(value = "svFilePathNm") String svFilePathNm,
			@RequestParam(value = "svFileNm") String svFileNm, @RequestParam(value = "orgFileNm") String orgFileNm,
			HttpServletResponse response) {

		File file = new File(svFilePathNm, svFileNm);
		log.debug("File download  ==> " + file.toString());
		try {
			byte[] data = org.apache.commons.io.FileUtils.readFileToByteArray(file);
			response.setContentType("application/octet-stream");
			response.setContentLength(data.length);
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setHeader("Content-Disposition",
					"attachment; fileName=\"" + URLEncoder.encode(orgFileNm, "UTF-8") + "\";");

			response.getOutputStream().write(data);
			response.getOutputStream().flush();
			response.getOutputStream().close();
			log.debug("File download is Success!! ==> " + data.length);
		} catch (IOException e) {
			throw new RuntimeException("파일 다운로드에 실패하였습니다.");

		} catch (Exception e) {
			throw new RuntimeException("시스템에 문제가 발생하였습니다.");
		}

	}

}
