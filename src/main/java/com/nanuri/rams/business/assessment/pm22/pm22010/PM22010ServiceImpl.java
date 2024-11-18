package com.nanuri.rams.business.assessment.pm22.pm22010;

import java.util.List;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.mapper.*;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@Transactional
@RequiredArgsConstructor
public class PM22010ServiceImpl implements PM22010Service {

	// private final PM22010Mapper pm22010Mapper;
	private final RAA02BMapper raa02bMapper;
	private final RAA60BMapper raa60bMapper;
	private final RAA61BMapper raa61bMapper;
	private final RAA62BMapper raa62bMapper;
	private final RAA63BMapper raa63bMapper;
	private final RAA64BMapper raa64bMapper;
	private final RAA66BMapper raa66bMapper;
	
	
	@Autowired    
	private AuthenticationFacade facade;

	//사후관리 - 부실자산 사후관리 조회
	@Override
	public List<PM22010SVO> getEamList(PM22010SVO eamList) {
		
		List<PM22010SVO> getEamList = raa02bMapper.getEamList(eamList);
		
		return getEamList;
	}
	
	//-----------------------TAB1 관리이력-----------------------//
	// 관리이력 조회
	@Override
	public List<RAA60BVO> getEamDetail(RAA60BVO eamInfo) {
		
		List<RAA60BVO> getEamDetailInfo = raa60bMapper.getEamDetail(eamInfo);
		
		return getEamDetailInfo;
		
	}

	// 관리이력 저장
	@Override
	public int registEamInfo(RAA60BVO eamInfo) {
		String ibDealNo = eamInfo.getIbDealNo();
		int sq = eamInfo.getSq();
		String riskInspctCcd = eamInfo.getRiskInspctCcd();
		String lstCCaseCcd = eamInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA60BDTO raa60bDTO = new RAA60BDTO();
		
		raa60bDTO.setIbDealNo(ibDealNo);									// IBDEAL번호
		raa60bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());			// 리스크심사구분코드
		raa60bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());				// 부수안건구분코드
		raa60bDTO.setSq(Integer.valueOf(sq));								// 일련번호
	
		raa60bDTO.setEvntAftrMngCcd(eamInfo.getEvntAftrMngCcd());			// 사후관리구분코드
		raa60bDTO.setEvntAftrMngCntnt(eamInfo.getEvntAftrMngCntnt());		// 사후관리내용
		
		raa60bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());			// 처리부점코드
		raa60bDTO.setHndlPeno(facade.getDetails().getEno());				// 처리자사번
		
		if (Integer.toString(sq).equals("0")) {
		    RAA60BDTO raa60bDTOsq = raa60bMapper.getEamSq(raa60bDTO); 		// 일련번호 MAX값 조회
		    
		    if (raa60bDTOsq == null) {										// null일때 sq 1로 변경			
		    	raa60bDTOsq = new RAA60BDTO();
		    	raa60bDTOsq.setSq(Integer.valueOf(1));
		    }
		    
		    int maxSq = raa60bDTOsq.getSq();
		    
		    raa60bDTO.setSq(maxSq);
		    
		    return raa60bMapper.registEamInfo(raa60bDTO);  					// 재산조사 등록
		    
		} else {
			
		    return raa60bMapper.updateEamInfo(raa60bDTO);  					// 재산조사 수정
		    
		}
	
		
	}

	// 관리이력 삭제
	@Override
	public int deleteEamInfo(RAA60BVO eamInfo) {
		
		return raa60bMapper.deleteEamInfo(eamInfo);
		
	}
	
	// 관리이력 파일 저장
	@Override
	public void registFileInfo(RAA64BDTO dto) {
		
		dto.setHndlDprtCd(facade.getDetails().getDprtCd());
		dto.setHndlPEno(facade.getDetails().getEno());
		
		raa64bMapper.insertFileInfo(dto);
	}
	
	// 관리이력 파일 삭제
	@Override
	public void deleteFileInfo(RAA64BDTO dto) {
		dto.setHndlDprtCd(facade.getDetails().getDprtCd());
		dto.setHndlPEno(facade.getDetails().getEno());
		
		raa64bMapper.updateFileInfo(dto);
		
	}
	
	// 관리이력 파일 조회
	@Override
	public List<RAA64BDTO> getListFileInfo(RAA64BVO vo) {
		List<RAA64BDTO> list = raa64bMapper.selectFileList(vo);
		
		return list;
	}
	
	//-----------------------TAB2 재산조사-----------------------//
	// 재산조사 조회
	@Override
	public List<RAA61BVO> getEsttDetail(RAA61BVO esttInfo) {
		
		return raa61bMapper.getEsttDetail(esttInfo);
	}

	// 재산조사 저장
	@Override
	public int registEsttInfo(RAA61BVO esttInfo) {

		String ibDealNo = esttInfo.getIbDealNo();
		int sq = esttInfo.getSq();
		String riskInspctCcd = esttInfo.getRiskInspctCcd();
		String lstCCaseCcd = esttInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA61BDTO raa61bDTO = new RAA61BDTO();
		
		raa61bDTO.setIbDealNo(ibDealNo);									// IBDEAL번호
		raa61bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());			// 리스크심사구분코드
		raa61bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());				// 부수안건구분코드
		raa61bDTO.setSq(Integer.valueOf(sq));								// 일련번호
		raa61bDTO.setEsttExmntnTrgtCcd(esttInfo.getEsttExmntnTrgtCcd());	// 재산조사대상구분코드
		raa61bDTO.setEsttKndCcd(esttInfo.getEsttKndCcd()); 					// 재산종류구분코드
		raa61bDTO.setRealPrftF(esttInfo.getRealPrftF());					// 실제이익여부
		raa61bDTO.setEsttExmntnCntnt(esttInfo.getEsttExmntnCntnt()); 		// 재산조사내용
		
		
		raa61bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());			// 처리부점코드
		raa61bDTO.setHndlPEno(facade.getDetails().getEno());				// 처리자사번
		
		if (Integer.toString(sq).equals("0")) {
		    RAA61BDTO raa61bDTOsq = raa61bMapper.getEsttSq(raa61bDTO); 		// 일련번호 MAX값 조회
		    
		    if (raa61bDTOsq == null) {										// null일때 sq 1로 변경			
		        raa61bDTOsq = new RAA61BDTO();
		        raa61bDTOsq.setSq(Integer.valueOf(1));
		    }
		    
		    int maxSq = raa61bDTOsq.getSq();
		    
		    raa61bDTO.setSq(maxSq);
		    
		    return raa61bMapper.registEsttInfo(raa61bDTO);  				// 재산조사 등록
		    
		} else {
			
		    return raa61bMapper.updateEsttInfo(raa61bDTO);  				// 재산조사 수정
		    
		}
	
	}

	// 재산조사 삭제
	@Override
	public int deleteEsttInfo(RAA61BVO esttInfo) {
		
		return raa61bMapper.deleteEsttInfo(esttInfo);
		
	}

	
	//-----------------------TAB3 법적절차-----------------------//
	// 법적절차 조회
	@Override
	public List<RAA62BVO> getLglDetail(RAA62BVO lglInfo) {
		
		return raa62bMapper.getLglDetail(lglInfo);
		
	}

	// 법적절차 저장
	@Override
	public int registLglInfo(RAA62BVO lglInfo) {
		
		String ibDealNo = lglInfo.getIbDealNo();
		int sq = lglInfo.getSq();
		String riskInspctCcd = lglInfo.getRiskInspctCcd();
		String lstCCaseCcd = lglInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA62BDTO raa62bDTO = new RAA62BDTO();
		
		raa62bDTO.setIbDealNo(ibDealNo);									// IBDEAL번호
		raa62bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());			// 리스크심사구분코드
		raa62bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());				// 부수안건구분코드
		raa62bDTO.setSq(Integer.valueOf(sq));								// 일련번호
		
		raa62bDTO.setLglPrcrCcd(lglInfo.getLglPrcrCcd());					// 법적절차구분코드
		raa62bDTO.setLglPrcrKndCcd(lglInfo.getLglPrcrKndCcd()); 			// 법적절차종류구분코드
		raa62bDTO.setLglPrcrCntnt(lglInfo.getLglPrcrCntnt());				// 법적절차내용
		raa62bDTO.setCrtrmInfo(lglInfo.getCrtrmInfo()); 					// 법원정보
		raa62bDTO.setAcdntNo(lglInfo.getAcdntNo()); 						// 사건번호
		
		
		raa62bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());			// 처리부점코드
		raa62bDTO.setHndlPEno(facade.getDetails().getEno());				// 처리자사번
		
		if (Integer.toString(sq).equals("0")) {
		    RAA62BDTO raa62bDTOsq = raa62bMapper.getLglSq(raa62bDTO); 		// 일련번호 MAX값 조회
		    
		    if (raa62bDTOsq == null) {										// null일때 sq 1로 변경			
		    	raa62bDTOsq = new RAA62BDTO();
		    	raa62bDTOsq.setSq(Integer.valueOf(1));
		    }
		    
		    int maxSq = raa62bDTOsq.getSq();
		    
		    raa62bDTO.setSq(maxSq);
		    
		    return raa62bMapper.registLglInfo(raa62bDTO);  					// 법적절차 등록
		    
		} else {
			
		    return raa62bMapper.updateLglInfo(raa62bDTO);  					// 법적절차 수정
		    
		}
	}

	// 법적절차 삭제
	@Override
	public int deleteLglInfo(RAA62BVO lglInfo) {
		
		return raa62bMapper.deleteLglInfo(lglInfo);
		
	}

	
	//-----------------------TAB4 시효관리-----------------------//
	// 시효관리 조회
	@Override
	public List<RAA63BVO> getEfctDetail(RAA63BVO efctInfo) {
		
		return raa63bMapper.getEfctDetail(efctInfo);
	}
	
	// 시효관리 저장
	@Override
	public int registEfctInfo(RAA63BVO efctInfo) {
		
		String ibDealNo = efctInfo.getIbDealNo();
		int sq = efctInfo.getSq();
		String riskInspctCcd = efctInfo.getRiskInspctCcd();
		String lstCCaseCcd = efctInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA63BDTO raa63bDTO = new RAA63BDTO();
		
		raa63bDTO.setIbDealNo(ibDealNo);												// IBDEAL번호
		raa63bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());						// 리스크심사구분코드
		raa63bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());							// 부수안건구분코드
		raa63bDTO.setSq(Integer.valueOf(sq));											// 일련번호
		
		String efctOcrncDt = efctInfo.getEfctOcrncDt();
		String efctEndDt = efctInfo.getEfctEndDt();
		
		raa63bDTO.setEfctOcrncDt(DateUtil.changeDateFormat(efctOcrncDt, "yyyyMMdd"));	// 효력발생일자
		raa63bDTO.setEfctEndDt(DateUtil.changeDateFormat(efctEndDt, "yyyyMMdd")); 		// 효력종료일자
		raa63bDTO.setEfctMngCntnt(efctInfo.getEfctMngCntnt());							// 효력관리내용
		
		
		raa63bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());						// 처리부점코드
		raa63bDTO.setHndlPEno(facade.getDetails().getEno());							// 처리자사번
		
		if (Integer.toString(sq).equals("0")) {
		    RAA63BDTO raa63bDTOsq = raa63bMapper.getEfctSq(raa63bDTO); 					// 일련번호 MAX값 조회
		    
		    if (raa63bDTOsq == null) {													// null일때 sq 1로 변경			
		    	raa63bDTOsq = new RAA63BDTO();
		    	raa63bDTOsq.setSq(Integer.valueOf(1));
		    }
		    
		    int maxSq = raa63bDTOsq.getSq();
		    raa63bDTO.setSq(maxSq);
		    
		    return raa63bMapper.registEfctInfo(raa63bDTO);  							// 시효관리 등록
		    
		} else {
			
		    return raa63bMapper.updateEfctInfo(raa63bDTO);  							// 시효관리 수정
		    
		}
	}

	// 시효관리 삭제
	@Override
	public int deleteEfctInfo(RAA63BVO efctInfo) {
		
		return raa63bMapper.deleteEfctInfo(efctInfo);
		
	}

	//-----------------------TAB5 안건연결-----------------------//
	// 안건연결 내역 조회
	@Override
	public List<RAA66BVO> getCnctList(RAA66BDTO paramData){
		return raa66bMapper.getCnctList(paramData);
	}

	// 안건연결 정보 저장
	@Override
	public int registCnctInfo(RAA66BDTO cnctInfo){
		int cnctOption = cnctInfo.getSq();

		/* 연결할 안건의 심사진행상태코드 체크 후 500이 아닐 시 오류메세지 송출 */
		String ibDealNo =  cnctInfo.getCnctIbDealNo();
		String riskInspctCcd = cnctInfo.getCnctRiskInspctCcd();
		String lstCCaseCcd = cnctInfo.getLstCCaseCcd();

		RAA02BDTO checkInspctPrgrsStCd = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);

		if( !"500".equals(checkInspctPrgrsStCd.getInspctPrgrsStCd()) ) {
			return 500;
		}


		cnctInfo.setHndlDprtCd(facade.getDetails().getDprtCd());
		cnctInfo.setHndlPEno(facade.getDetails().getEno());

		if( cnctOption > 0 ) {
			// update
			cnctOption = raa66bMapper.updateCnctInfo(cnctInfo);
		} else {
			// insert
			cnctOption = raa66bMapper.registCnctInfo(cnctInfo);
		}
		return cnctOption;
	}

	// 안건연결 정보 삭제
	public int deleteCnctInfo(String sq) {
		return raa66bMapper.deleteCnctInfo(sq);
	}

}
