package com.nanuri.rams.business.assessment.ab01.ab01011;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.nanuri.rams.business.common.dto.RAB01BDTO;
import com.nanuri.rams.business.common.dto.RAB04BDTO;
import com.nanuri.rams.business.common.mapper.RAB01AMapper;
import com.nanuri.rams.business.common.mapper.RAB01BMapper;
import com.nanuri.rams.business.common.mapper.RAB02BMapper;
import com.nanuri.rams.business.common.mapper.RAB03BMapper;
import com.nanuri.rams.business.common.mapper.RAB04BMapper;
import com.nanuri.rams.business.common.vo.AB01011SVO;
import com.nanuri.rams.business.common.vo.AB01011SVO.CallReportInfo;
import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnDeptNoInfo;
import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnUsrNoInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AB01011ServiceImpl implements AB01011Service {

	// private final AB01011Mapper ab01011Mapper;

	private final RAB01AMapper rab01aMapper;
	private final RAB01BMapper rab01bMapper;
	private final RAB02BMapper rab02bMapper;
	private final RAB03BMapper rab03bMapper;
	private final RAB04BMapper rab04bMapper;

	@Autowired
	private AuthenticationFacade facade;

	// 보고서번호 조회
	@Override
	public List<AB01011SVO> findRepNo(String repNo) {
		// TODO Auto-generated method stub
		return rab01bMapper.getRepNo(repNo);
	}

	// 신규등록
	@Override
	public int registCallReportInfo(CallReportInfo callReportInfo) {
		LocalDate today = LocalDate.now();
		// LocalTime now = LocalTime.now();
		DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
		DateTimeFormatter date2 = DateTimeFormatter.ofPattern("yyyyMM");
		// DateTimeFormatter time = DateTimeFormatter.ofPattern("HHmmss");

		String eno = facade.getDetails().getEno();
		String dprtCd = facade.getDetails().getDprtCd();
		String rgstDt = today.format(date);
		String month = today.format(date2);

		RAB01BDTO rab01bDTO = new RAB01BDTO();
		// String.format("%05s", callReportInfo.getRepNo())
		//rab01bDTO.setRepNo(callReportInfo.getRepNo());						// 리포트번호
		rab01bDTO.setRepNo(month +String.format("%5s", callReportInfo.getRepNo()).replace(" ", "0"));						// 리포트번호
		rab01bDTO.setRelDocCcd(callReportInfo.getRelDocCcd());				// 관련문서구분코드
		rab01bDTO.setRepCcd(callReportInfo.getRepCcd());					// 리포트구분코드
		rab01bDTO.setEntpCd(callReportInfo.getEntpCd()); 					// 업체코드
		rab01bDTO.setMetTitNm(callReportInfo.getMetTitNm()); 				// 미팅제목명
		rab01bDTO.setMetDt(DateUtil.changeDateFormat(callReportInfo.getMetDt(),"yyyy-MM-dd")); 						// 미팅일자
		rab01bDTO.setInvstGdsLdvdCd(callReportInfo.getInvstGdsLdvdCd());	// 투자상품대분류코드
		rab01bDTO.setInvstGdsMdvdCd(callReportInfo.getInvstGdsMdvdCd());	// 투자상품중분류코드
		rab01bDTO.setMetPrpsNm(callReportInfo.getMetPrpsNm()); 				// 미팅목적명	
		rab01bDTO.setMetCntnt(callReportInfo.getMetCntnt()); 				// 미팅내용
		rab01bDTO.setCustNm(callReportInfo.getCustNm());					// 고객명
		rab01bDTO.setCustChrgDeptNm(callReportInfo.getCustChrgDeptNm());	// 고객담당부서명
		rab01bDTO.setCustPstnNm(callReportInfo.getCustPstnNm()); 			// 고객직급명
		rab01bDTO.setCustMainCrrCntnt(callReportInfo.getCustMainCrrCntnt());// 고객주요경력내용
		rab01bDTO.setCustRefCntnt(callReportInfo.getCustRefCntnt()); 		// 고객참고사항내용
		rab01bDTO.setChrgPEno(callReportInfo.getChrgPEno()); 				// 담당사원번호
		rab01bDTO.setChrgDprtCd(callReportInfo.getChrgDprtCd()); 			// 담당부점코드
		rab01bDTO.setIbDealNo(callReportInfo.getIbDealNo()); 				// IBDEAL번호
		rab01bDTO.setScrtArtcF(callReportInfo.getScrtArtcF()); 				// 비밀글여부

		// rgstDt 등록일자
		// hndlDyTm 처리일시
		// dltF 삭제여부
		rab01bDTO.setHndlPEno(eno); 										// 처리자사번
		rab01bDTO.setHndlDprtCd(dprtCd); 									// 처리부점코드
		rab01bDTO.setRgstDt(rgstDt);    									// 등록일자
		rab01bDTO.setHndlDyTm(null); 										// 처리일시
		rab01bDTO.setDltF("N"); 											// 삭제여부

		return rab01bMapper.registCallReportInfo(rab01bDTO);
	}

	@Override
	public List<AB01011SVO> findEntpList(String entpNm) {
		List<AB01011SVO> entpList = rab01aMapper.getEntpList(entpNm);
		return entpList;
	}

	@Override
	public int registRepDsgnUsrNoInfo(@RequestBody List<repDsgnUsrNoInfo> paramData) {

		LocalDate today = LocalDate.now();
		DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");

		String hndlPEno = facade.getDetails().getEno();
		String hndlDprtCd = facade.getDetails().getDprtCd();
		String rgstDt = today.format(date);

		int count = 0;

		for (int i = 0; i < paramData.size(); i++) {
			paramData.get(i).setRgstDt(rgstDt);
			paramData.get(i).setHndlDprtCd(hndlDprtCd);
			paramData.get(i).setHndlPEno(hndlPEno);
		}

		if (paramData.size() > 0) {
			count = rab02bMapper.insertRepDsgnUsrNoInfo(paramData);
		}

		return count;
	}

	@Override
	public int registRepDsgnDeptNoInfo(List<repDsgnDeptNoInfo> paramData) {

		LocalDate today = LocalDate.now();
		DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");

		String hndlPEno = facade.getDetails().getEno();
		String hndlDprtCd = facade.getDetails().getDprtCd();
		String rgstDt = today.format(date);

		int count = 0;

		for (int i = 0; i < paramData.size(); i++) {
			paramData.get(i).setRgstDt(rgstDt);
			paramData.get(i).setHndlDprtCd(hndlDprtCd);
			paramData.get(i).setHndlPEno(hndlPEno);
		}

		if (paramData.size() > 0) {
			count = rab03bMapper.insertRepDsgnDeptNoInfo(paramData);
		}

		return count;
	}

	// 첨부파일 저장
	@Override
	public void registRepFileInfo(RAB04BDTO dto) {
		LocalDate today = LocalDate.now();

		DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
		String rgstDt = today.format(date);

		dto.setHndlDprtCd(facade.getDetails().getDprtCd());
		dto.setHndlPEno(facade.getDetails().getEno());
		dto.setRgstDt(rgstDt);
		rab04bMapper.insertFileInfo(dto);
	}

	@Override
	public List<RAB04BDTO> getListFileInfo(RAB04BDTO dto) {
		List<RAB04BDTO> list = rab04bMapper.selectFileInfo(dto);
		return list;
	}

	@Override
	public void deleteFileInfo(RAB04BDTO dto) {
		dto.setHndlDprtCd(facade.getDetails().getDprtCd());
		dto.setHndlPEno(facade.getDetails().getEno());

		rab04bMapper.updateFileInfo(dto);

	}

}
