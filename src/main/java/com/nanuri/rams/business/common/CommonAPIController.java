package com.nanuri.rams.business.common;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.dto.IBIMS114BDTO;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.dto.IBIMS992BDTO;
import com.nanuri.rams.business.common.dto.IBIMS993BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA20BDTO;
import com.nanuri.rams.business.common.dto.RAA98ADTO;
import com.nanuri.rams.business.common.dto.RAB98BDTO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.business.common.vo.RAA20BVO;
import com.nanuri.rams.com.WF.WorkFlow;
import com.nanuri.rams.com.dto.FileDTO;
import com.nanuri.rams.com.dto.WorkFlowDTO;
import com.nanuri.rams.com.utils.FileUtil;

import io.netty.util.internal.StringUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class CommonAPIController {
	
	private final CommonService commonService;

	@Autowired
	private final WorkFlow workFlow;
	
	@Autowired
	private FileUtil fileUtils;

	// 담당직원 - 로그인유저정보
	@GetMapping(value = "/getUserAuth")
	public Map<String, Object> getUserAuth() {
		return commonService.getUserAuth();
	}
	
	// 직원검색
	@GetMapping(value = "/findEmpList")
	public List<IBIMS003BDTO> findEmpList (IBIMS003BDTO param) {
		return commonService.findEmpList(param);
	}
	
	// 부서검색
	@GetMapping(value = "/findDprtList")
	public List<RAA98ADTO> findDprtList (RAA98ADTO raa98aDto) {
		return commonService.findDprtList(raa98aDto);
	}
	
	// 법인검색
	@GetMapping(value = "/findEntList")
	public List<IBIMS114BDTO> findEntList(IBIMS114BDTO param) {
		return commonService.findEntList(param);
	}
	
	// 공통코드
	@GetMapping(value = "/getSelectBoxCode/{code}")
	public List<Map<String, Object>> getSelectBoxCode(@PathVariable String code) {
		List<String> param = new ArrayList<>();
		param.add(code);
		return commonService.getSelectBox(param);
	}

	// 공통코드2
	@GetMapping(value = "/getSelectBoxCode2/{code}")
	public List<Map<String, Object>> getSelectBoxCode2(@PathVariable String code) {
		return commonService.getSelectBox2(code);
	}
	
	// 공통코드
	@GetMapping(value = "/getSelectBoxList")
	public List<Map<String, Object>> getSelectBoxList(@RequestParam("codeList") String codeList) {
		
		return commonService.getSelectBoxList(codeList);
	}
	
	// 파일업로드
	@PostMapping(value = "/uploadFile")
	public RAA20BDTO uploadFile(@RequestParam("uploadfile") MultipartFile uploadfile
			, @RequestParam(value = "fileIbDealNo", required=false) String ibDealNo
			, @RequestParam(value = "fileRiskInspctCcd", required=false) String riskInspctCcd
			, @RequestParam(value = "fileLstCCaseCcd", required=false) String lstCCaseCcd
			) {
		
		if(StringUtil.isNullOrEmpty(lstCCaseCcd)) {
			LocalDateTime today = LocalDateTime.now();
			DateTimeFormatter date = DateTimeFormatter.ofPattern("yyMMddHHmmss");
			ibDealNo = today.format(date);
		}
		if(StringUtil.isNullOrEmpty(riskInspctCcd)) {
			riskInspctCcd = "99";
		}
		if(StringUtil.isNullOrEmpty(lstCCaseCcd)) {
			lstCCaseCcd = "99";
		}
		
		
		FileDTO fileInfo = fileUtils.uploadFile(uploadfile);
		
		RAA20BDTO dto = new RAA20BDTO();
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
		dto.setOrgFileNm(fileInfo.getOriginalName());
		dto.setRgstDt(fileInfo.getRgstDt());

		commonService.registFileInfo(dto);
		
		return dto;
	}

	/**
	 * 파일업로드 공통 수정본
	 */
	// @PostMapping(value = "/uploadFile")
	// public CommonFileDTO uploadFile(@RequestParam("uploadfile") MultipartFile uploadfile
	// 		, @RequestParam(value = "fileIbDealNo", required=false) String ibDealNo
	// 		, @RequestParam(value = "fileRiskInspctCcd", required=false) String riskInspctCcd
	// 		, @RequestParam(value = "fileLstCCaseCcd", required=false) String lstCCaseCcd
	// 		) {
		
	// 	if(StringUtil.isNullOrEmpty(lstCCaseCcd)) {
	// 		LocalDateTime today = LocalDateTime.now();
	// 		DateTimeFormatter date = DateTimeFormatter.ofPattern("yyMMddHHmmss");
	// 		ibDealNo = today.format(date);
	// 	}
	// 	if(StringUtil.isNullOrEmpty(riskInspctCcd)) {
	// 		riskInspctCcd = "99";
	// 	}
	// 	if(StringUtil.isNullOrEmpty(lstCCaseCcd)) {
	// 		lstCCaseCcd = "99";
	// 	}
		
		
	// 	FileDTO fileInfo = fileUtils.uploadFile(uploadfile);
	// 	CommonFileDTO commonDto = new CommonFileDTO();

	// 	BeanUtils.copyProperties(fileInfo, commonDto);

	// 	commonService.registFileInfo(commonDto);
		
	// 	return commonDto;
	// }
	
	// 파일삭제
	@GetMapping(value = "/deleteFile")
	public List<RAA20BDTO> removeFile(@RequestParam(value = "fileIbDealNo") String ibDealNo
			, @RequestParam(value = "fileRiskInspctCcd") String riskInspctCcd
			, @RequestParam(value = "fileLstCCaseCcd") String lstCCaseCcd
			, @RequestParam(value = "arrAttFileSq[]") List<Integer> arrAttFileSq
			) {
		
		RAA20BVO vo = new RAA20BVO();
		vo.setIbDealNo(ibDealNo);
		vo.setRiskInspctCcd(riskInspctCcd);
		vo.setLstCCaseCcd(lstCCaseCcd);
		vo.setArrAttFileSq(arrAttFileSq);
		
		List<RAA20BDTO> delFiles = commonService.getListFileInfo(vo);
		
		// 서버에 파일 삭제
		for(RAA20BDTO dto : delFiles) {
			commonService.deleteFileInfo(dto);
			FileUtil.deleteFile(dto.getSvFilePathNm(), dto.getSvFileNm());
		}
		
		vo.setArrAttFileSq(null);
		List<RAA20BDTO> list = commonService.getListFileInfo(vo);
		
		return list;
	}
	
	// 파일목록 조회
	@GetMapping(value = "/getFiles")
	public List<RAA20BDTO> getFileList(@RequestParam(value = "fileIbDealNo") String ibDealNo
			, @RequestParam(value = "fileRiskInspctCcd", required=false) String riskInspctCcd
			, @RequestParam(value = "fileLstCCaseCcd", required=false) String lstCCaseCcd
			) {
		
		RAA20BVO vo = new RAA20BVO();
		vo.setIbDealNo(ibDealNo);
		vo.setRiskInspctCcd(riskInspctCcd);
		vo.setLstCCaseCcd(lstCCaseCcd);
		
		List<RAA20BDTO> list = commonService.getListFileInfo(vo);
		
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
	
	// 담당직원 - 로그인유저정보
	@GetMapping(value = "/getBitrKind")
	public List<RAB98BDTO> getBitrKind() {
		return commonService.getBitrKind();
	}

	// 오늘의 할 일 등록
	@PostMapping(value = "makeToDoList")
	public int makeToDoList(IBIMS100BDTO paramData) {
		return commonService.makeToDoList(paramData);
	}

	// deal 심사진행상태변경
	@PostMapping(value = "updateInspctPrgrsStCd")
	public int updateInspctPrgrsStCd(RAA02BDTO paramData) {
		return commonService.updateInspctPrgrsStCd(paramData);
	}
	
	// 금융기관정보
	@GetMapping(value = "/getFnltList")
	public List<IBIMS992BDTO> getFnltList(IBIMS992BDTO param) {
		return commonService.getFnltList(param);
	}
	
	// 펀드정보
	@GetMapping(value = "/getFndList")
	public List<IBIMS993BDTO> getFndList(IBIMS993BDTO param) {
		return commonService.getFndList(param);
	}

	@GetMapping(value = "/wfAuthIdCheck")
	public int wfAuthIdCheck(WorkFlowDTO param){
		return workFlow.wfAuthIdCheck(param);
	}

	/**
	 * 승인자확인
	 */
	@PostMapping(value = "/chkDcfcEno")
	public String chkDcfcEno(@RequestBody IBIMS231BVO paramData) {
		return commonService.chkDcfcEno(paramData);
	}

	/**
	 * 결재단계체크
	 */
	@PostMapping(value = "/chkDecdStep")
	public int chkDecdStep(@RequestBody IBIMS231BDTO param) {
		return commonService.chkDecdStep(param);
	}

}
