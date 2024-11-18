package com.nanuri.rams.business.assessment.ab01.ab01011;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nanuri.rams.business.common.dto.RAB04BDTO;
import com.nanuri.rams.business.common.vo.AB01011SVO;
import com.nanuri.rams.business.common.vo.AB01011SVO.CallReportInfo;
import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnDeptNoInfo;
import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnUsrNoInfo;
import com.nanuri.rams.business.common.vo.RAB04BVO;
import com.nanuri.rams.com.dto.FileDTO;
import com.nanuri.rams.com.utils.FileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AB01011S")
@RequiredArgsConstructor
@RestController
public class AB01011APIController {
	
	private final AB01011Service ab01011Service;
	
	@Autowired
	private FileUtil fileUtils;

	@GetMapping(value = "/getRepNo")
	public List<AB01011SVO> findRepNo (String repNo) {
		return ab01011Service.findRepNo(repNo);
	}
	
	//업체정보 검색
	@GetMapping(value = "/findEntpInfo")
	public List<AB01011SVO> findEntpInfo (String entpNm) {
		return ab01011Service.findEntpList(entpNm);
	}
	
	//신규등록
	@PostMapping(value = "/registCallReportInfo")
	public int registCallReportInfo(CallReportInfo callReportInfo) {
		return ab01011Service.registCallReportInfo(callReportInfo); 
	}
	
	//지정조회자 저장
	@PostMapping(value = "/registRepDsgnUsrNoInfo")
	public int registRepDsgnUsrNoInfo(@RequestBody List<repDsgnUsrNoInfo> dsgnUsrNoInfo) {
		return ab01011Service.registRepDsgnUsrNoInfo(dsgnUsrNoInfo);
	}
	
	//지정조회부서 저장
	@PostMapping(value = "/registRepDsgnDeptNoInfo")
	public int registRepDsgnDeptNoInfo(@RequestBody List<repDsgnDeptNoInfo> dsgnDeptNoInfo) {
		return ab01011Service.registRepDsgnDeptNoInfo(dsgnDeptNoInfo);
	}
	
	// 파일저장
	@PostMapping(value = "/repFileInfo")
	public RAB04BDTO registRepFileInfo(@RequestParam("uploadfile") MultipartFile uploadfile
			, @RequestParam(value = "fileRepNo", required=false) String repNo) {
		
		FileDTO fileInfo = fileUtils.uploadFile(uploadfile);
		
		RAB04BDTO dto = new RAB04BDTO();
		
		dto.setRepNo(repNo);
		dto.setSvFilePathNm(fileInfo.getServerPath());
		dto.setSvFileNm(fileInfo.getSaveName());
		String[] arrExpn = fileInfo.getOriginalName().split("\\.");
		log.debug(arrExpn.length+"") ;
		dto.setSvFileExpnsnNm(arrExpn[arrExpn.length-1]);
		dto.setSvFileSz(fileInfo.getSize());
		dto.setScrnMenuId(null);
		dto.setOrgFileNm(fileInfo.getOriginalName());
		//dto.setRgstDt(fileInfo.getRgstDt());
		dto.setScrnMenuId("AB01011S");
		
		ab01011Service.registRepFileInfo(dto);
		
		return dto; 
	}
	
	//파일 조회
	@GetMapping(value = "/getFiles")
	public List<RAB04BDTO> getFileList(@RequestParam(value = "fileRepNo", required=false) String repNo) {
		RAB04BVO vo = new RAB04BVO();
		vo.setRepNo(repNo);
		
		
		List<RAB04BDTO> list = ab01011Service.getListFileInfo(vo);
		
		return list;
	}
	
	// 파일삭제
		@GetMapping(value = "/deleteFile")
		public List<RAB04BDTO> removeFile(@RequestParam(value = "fileRepNo", required=false) String repNo
				, @RequestParam(value = "arrRepFileAttSq[]") List<Integer> arrRepFileAttSq
				) {
			
			RAB04BVO vo = new RAB04BVO();
			//vo.setIbDealNo(ibDealNo);
			//vo.setRiskInspctCcd(riskInspctCcd);
			vo.setRepNo(repNo);
			vo.setArrRepFileAttSq(arrRepFileAttSq);
			
			List<RAB04BDTO> delFiles = ab01011Service.getListFileInfo(vo);
			
			// 서버에 파일 삭제
			for(RAB04BDTO dto : delFiles) {
				ab01011Service.deleteFileInfo(dto);
				FileUtil.deleteFile(dto.getSvFilePathNm(), dto.getSvFileNm());
			}
			
			vo.setArrRepFileAttSq(null);
			List<RAB04BDTO> list = ab01011Service.getListFileInfo(vo);
			
			return list;
		}
	
}
