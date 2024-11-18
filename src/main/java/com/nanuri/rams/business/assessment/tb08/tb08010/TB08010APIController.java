package com.nanuri.rams.business.assessment.tb08.tb08010;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

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
import com.nanuri.rams.com.utils.FileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB08010S")
@RequiredArgsConstructor
@RestController
public class TB08010APIController {

	private final TB08010Service tb08010service;
	
	@Autowired
	private FileUtil fileUtils;
	
	// 사후관리 - 부실자산 사후관리 조회
	@GetMapping(value = "/getEamList")
	public List<IBIMS103BVO> getEamList(IBIMS103BVO eamList) {
		return tb08010service.getEamList(eamList);
	}
	
	//-----------------------TAB1 관리이력-----------------------//
	// 관리이력 조회
	@GetMapping(value = "/getEamDetail")
	public List<IBIMS606BVO> getEamDetail(IBIMS606BDTO eamInfo) {
		
		return tb08010service.getEamDetail(eamInfo);
	}
	
	// 관리이력 저장
	@PostMapping(value = "/registEamInfo")
	public int registEamInfo(IBIMS606BDTO eamInfo) {
		return tb08010service.registEamInfo(eamInfo);
	}
	
	// 관리이력 삭제
	@PostMapping(value = "/deleteEamInfo")
	public int deleteEamInfo(IBIMS606BDTO eamInfo) {
		return tb08010service.deleteEamInfo(eamInfo);
	}
	
	// 파일업로드
	@PostMapping(value = "/uploadFile")
	public RAA64BDTO uploadFile(@RequestParam("uploadfile") MultipartFile uploadfile
			, @RequestParam(value = "fileIbDealNo", required=false) String ibDealNo
			, @RequestParam(value = "fileRiskInspctCcd", required=false) String riskInspctCcd
			, @RequestParam(value = "fileLstCCaseCcd", required=false) String lstCCaseCcd
			) {
		
				/*
				 * if(StringUtil.isNullOrEmpty(lstCCaseCcd)) { LocalDateTime today =
				 * LocalDateTime.now(); DateTimeFormatter date =
				 * DateTimeFormatter.ofPattern("yyMMddHHmmss"); ibDealNo = today.format(date); }
				 * if(StringUtil.isNullOrEmpty(riskInspctCcd)) { riskInspctCcd = "99"; }
				 * if(StringUtil.isNullOrEmpty(lstCCaseCcd)) { lstCCaseCcd = "99"; }
				 */
		
		FileDTO fileInfo = fileUtils.uploadFile(uploadfile);
		
		RAA64BDTO dto = new RAA64BDTO();
		dto.setIbDealNo(ibDealNo);
		dto.setRiskInspctCcd(riskInspctCcd);
		dto.setLstCCaseCcd(lstCCaseCcd);
		dto.setSvFilePathNm(fileInfo.getServerPath());
		dto.setSvFileNm(fileInfo.getSaveName());
		String[] arrExpn = fileInfo.getOriginalName().split("\\.");
		log.debug(arrExpn.length+"") ;
		dto.setSvFileExpnsnNm(arrExpn[arrExpn.length-1]);
		dto.setSvFileSz(fileInfo.getSize());
		dto.setScrnMenuId(null);
		dto.setRealAttFileNm(fileInfo.getOriginalName());
		dto.setRgstDt(fileInfo.getRgstDt());

		tb08010service.registFileInfo(dto);
		
		return dto;
	}

	// 파일삭제
	@GetMapping(value = "/deleteFile")
	public List<RAA64BDTO> removeFile(@RequestParam(value = "fileIbDealNo") String ibDealNo
			, @RequestParam(value = "fileRiskInspctCcd") String riskInspctCcd
			, @RequestParam(value = "fileLstCCaseCcd") String lstCCaseCcd
			, @RequestParam(value = "arrAttFileSq[]") List<Integer> arrAttFileSq
			, @RequestParam(value = "arrHstSq[]") List<Integer> arrHstSq
			) {
		
		RAA64BVO vo = new RAA64BVO();
		vo.setIbDealNo(ibDealNo);
		vo.setRiskInspctCcd(riskInspctCcd);
		vo.setLstCCaseCcd(lstCCaseCcd);
		vo.setArrAttFileSq(arrAttFileSq);
		
		List<RAA64BDTO> delFiles = tb08010service.getListFileInfo(vo);
		
		// 서버에 파일 삭제
		for(RAA64BDTO dto : delFiles) {
			tb08010service.deleteFileInfo(dto);
			FileUtil.deleteFile(dto.getSvFilePathNm(), dto.getSvFileNm());
		}
		
		vo.setArrAttFileSq(null);
		List<RAA64BDTO> list = tb08010service.getListFileInfo(vo);
		
		return list;
	}
	
	// 파일목록 조회
	@GetMapping(value = "/getFiles")
	public List<RAA64BDTO> getFileList(@RequestParam(value = "fileIbDealNo") String ibDealNo
			, @RequestParam(value = "fileRiskInspctCcd", required=false) String riskInspctCcd
			, @RequestParam(value = "fileLstCCaseCcd", required=false) String lstCCaseCcd
			) {
		
		RAA64BVO vo = new RAA64BVO();
		vo.setIbDealNo(ibDealNo);
		vo.setRiskInspctCcd(riskInspctCcd);
		vo.setLstCCaseCcd(lstCCaseCcd);
		
		List<RAA64BDTO> list = tb08010service.getListFileInfo(vo);
		
		return list;
	}
	
	// 파일다운로드
	@GetMapping(value = "/downloadFile")
	public void downloadFile(@RequestParam(value = "svFilePathNm") String svFilePathNm
			, @RequestParam(value = "svFileNm") String svFileNm
			, @RequestParam(value = "orgFileNm") String orgFileNm
			, HttpServletResponse response) {

		File file = new File(svFilePathNm, svFileNm);
		log.debug("File download  ==> " + file.toString());
		try {
			byte[] data = org.apache.commons.io.FileUtils.readFileToByteArray(file);
			response.setContentType("application/octet-stream");
			response.setContentLength(data.length);
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(orgFileNm, "UTF-8") + "\";");

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
	
	
	//-----------------------TAB2 재산조사-----------------------//
	// 재산조사 조회
	@GetMapping(value = "/getEsttDetail")
	public List<IBIMS607BVO> getEsttDetail(IBIMS607BDTO esttInfo){
		
		return tb08010service.getEsttDetail(esttInfo);
	}
	
	// 재산조사 저장
	@PostMapping(value = "/registEsttInfo")
	public int registEsttInfo(IBIMS607BDTO esttInfo) {
		
		return tb08010service.registEsttInfo(esttInfo);
	}
	
	// 재산조사 삭제
	@PostMapping(value = "/deleteEsttInfo")
	public int deleteEsttInfo(IBIMS607BDTO esttInfo) {
		
		return tb08010service.deleteEsttInfo(esttInfo);
	}
	
	//-----------------------TAB3 법적절차-----------------------//
	// 법적절차 조회
	@GetMapping(value = "/getLglDetail")
	public List<IBIMS608BVO> getLglDetail(IBIMS608BDTO lglInfo){
		
		return tb08010service.getLglDetail(lglInfo);
	}
	
	// 법적절차 저장
	@PostMapping(value = "/registLglInfo")
	public int registLglInfo(IBIMS608BDTO lglInfo) {
		
		return tb08010service.registLglInfo(lglInfo);
	}
	
	// 법적절차 삭제
	@PostMapping(value = "/deleteLglInfo")
	public int deleteLglInfo(IBIMS608BDTO lglInfo)	{
		
		return tb08010service.deleteLglInfo(lglInfo);
	}
	
	
	//-----------------------TAB4 시효관리-----------------------//
	// 시효관리 조회
	@GetMapping(value = "/getEfctDetail")
	public List<IBIMS609BVO> getEfctDetail(IBIMS609BDTO efctInfo){
		return tb08010service.getEfctDetail(efctInfo);
	}
	
	// 시효관리 저장
	@PostMapping(value = "/registEfctInfo")
	public int registEfctInfo(IBIMS609BDTO efctInfo) {
		return tb08010service.registEfctInfo(efctInfo);
	}
	
	// 시효관리 삭제
	@PostMapping(value = "/deleteEfctInfo")
	public int deleteEfctInfo(IBIMS609BDTO efctInfo) {
		return tb08010service.deleteEfctInfo(efctInfo);
	}

	//-----------------------TAB5 안건연결-----------------------//
	// 안건연결 내역 조회
	@GetMapping(value = "/getCnctList")
	public List<RAA66BVO> getCnctList(RAA66BDTO paramData){
		return tb08010service.getCnctList(paramData);
	}

	// 안건연결 정보 저장
	@PostMapping(value = "/registCnctInfo")
	public int registCnctInfo(RAA66BDTO cnctInfo) {
		return tb08010service.registCnctInfo(cnctInfo);
	}

	// 안건연결 정보 삭제
	@PostMapping(value = "/deleteCnctInfo")
	public int deleteCnctInfo(@RequestParam String sq) {
		return tb08010service.deleteCnctInfo(sq);
	}
}
