package com.nanuri.rams.business.assessment.tb08.tb08010;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS606BDTO;
import com.nanuri.rams.business.common.dto.IBIMS607BDTO;
import com.nanuri.rams.business.common.dto.IBIMS608BDTO;
import com.nanuri.rams.business.common.dto.IBIMS609BDTO;
import com.nanuri.rams.business.common.dto.RAA64BDTO;
import com.nanuri.rams.business.common.dto.RAA66BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS606BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS607BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS608BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS609BMapper;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA61BMapper;
import com.nanuri.rams.business.common.mapper.RAA62BMapper;
import com.nanuri.rams.business.common.mapper.RAA63BMapper;
import com.nanuri.rams.business.common.mapper.RAA64BMapper;
import com.nanuri.rams.business.common.mapper.RAA66BMapper;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.IBIMS606BVO;
import com.nanuri.rams.business.common.vo.IBIMS607BVO;
import com.nanuri.rams.business.common.vo.IBIMS608BVO;
import com.nanuri.rams.business.common.vo.IBIMS609BVO;
import com.nanuri.rams.business.common.vo.RAA64BVO;
import com.nanuri.rams.business.common.vo.RAA66BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB08010ServiceImpl implements TB08010Service {

	// private final PM22010Mapper pm22010Mapper;
	private final IBIMS103BMapper ibims103bMapper;
	private final IBIMS606BMapper ibims606bMapper;
	private final IBIMS607BMapper ibims607bMapper;
	private final IBIMS608BMapper ibims608bMapper;
	private final IBIMS609BMapper ibims609bMapper;
	
	private final RAA02BMapper raa02bMapper;
	//private final RAA60BMapper raa60bMapper;
	private final RAA61BMapper raa61bMapper;
	private final RAA62BMapper raa62bMapper;
	private final RAA63BMapper raa63bMapper;
	private final RAA64BMapper raa64bMapper;
	private final RAA66BMapper raa66bMapper;
	
	
	@Autowired    
	private AuthenticationFacade facade;

	//사후관리 - 부실자산 사후관리 조회
	@Override
	public List<IBIMS103BVO> getEamList(IBIMS103BVO eamList) {
		
		List<IBIMS103BVO> getEamList = ibims103bMapper.getDealList(eamList);
		
		return getEamList;
	}
	
	//-----------------------TAB1 관리이력-----------------------//
	// 관리이력 조회
	@Override
	public List<IBIMS606BVO> getEamDetail(IBIMS606BDTO eamInfo) {

		// List<IBIMS606BVO> getEamDetailInfo = raa60bMapper.getEamDetail(eamInfo);
		List<IBIMS606BVO> getEamDetailInfo = ibims606bMapper.getEamDetail(eamInfo);

		return getEamDetailInfo;
	}

	// 관리이력 저장
	@Override
	public int registEamInfo(IBIMS606BDTO eamInfo) {
		
		int sq = eamInfo.getSn();
		
		eamInfo.setHndlPEno(facade.getDetails().getEno());
		
		if (Integer.toString(sq).equals("0")) {
			IBIMS606BDTO raa60bDTOsq = ibims606bMapper.getEamSq(eamInfo); 		// 일련번호 MAX값 조회
		    
		    if (raa60bDTOsq == null) {										// null일때 sq 1로 변경			
		    	raa60bDTOsq = new IBIMS606BDTO();
		    	raa60bDTOsq.setSn(Integer.valueOf(1));
		    }
		    
		    int maxSq = raa60bDTOsq.getSn();
		    
		    eamInfo.setSn(maxSq);
		    eamInfo.setFstRgstPEno(facade.getDetails().getEno());
		    eamInfo.setHndEmpno(facade.getDetails().getEno());
		    
		    return ibims606bMapper.registEamInfo(eamInfo);  					// 재산조사 등록
		} else {				
		    eamInfo.setHndEmpno(facade.getDetails().getEno());

		    return ibims606bMapper.updateEamInfo(eamInfo);  					// 재산조사 수정
		}
	}

	// 관리이력 삭제
	@Override
	public int deleteEamInfo(IBIMS606BDTO eamInfo) {
		return ibims606bMapper.deleteEamInfo(eamInfo);
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
	public List<IBIMS607BVO> getEsttDetail(IBIMS607BDTO esttInfo) {
		
		return ibims607bMapper.getEsttDetail(esttInfo);
	}

	// 재산조사 저장
	@Override
	public int registEsttInfo(IBIMS607BDTO esttInfo) {

		int sq = esttInfo.getSn();
		
		esttInfo.setHndlPEno(facade.getDetails().getEno());
		
		if (Integer.toString(sq).equals("0")) {
			IBIMS607BDTO raa61bDTOsq = ibims607bMapper.getEsttSq(esttInfo); 		// 일련번호 MAX값 조회
		    
		    if (raa61bDTOsq == null) {										// null일때 sq 1로 변경			
		        raa61bDTOsq = new IBIMS607BDTO();
		        raa61bDTOsq.setSn(Integer.valueOf(1));
		    }
		    
		    int maxSq = raa61bDTOsq.getSn();
		    
		    esttInfo.setSn(maxSq);
		    esttInfo.setFstRgstPEno(facade.getDetails().getEno());
				esttInfo.setHndEmpno(facade.getDetails().getEno());
		    
		    return ibims607bMapper.registEsttInfo(esttInfo);  				// 재산조사 등록
		} else {
				esttInfo.setHndEmpno(facade.getDetails().getEno());
		    return ibims607bMapper.updateEsttInfo(esttInfo);  				// 재산조사 수정
		}
	
	}

	// 재산조사 삭제
	@Override
	public int deleteEsttInfo(IBIMS607BDTO esttInfo) {
		return ibims607bMapper.deleteEsttInfo(esttInfo);
	}
	
	//-----------------------TAB3 법적절차-----------------------//
	// 법적절차 조회
	@Override
	public List<IBIMS608BVO> getLglDetail(IBIMS608BDTO lglInfo) {
		
		return ibims608bMapper.getLglDetail(lglInfo);
		
	}

	// 법적절차 저장
	@Override
	public int registLglInfo(IBIMS608BDTO lglInfo) {

		int sq = lglInfo.getSn();

		lglInfo.setHndlPEno(facade.getDetails().getEno());

		if (Integer.toString(sq).equals("0")) {
			IBIMS608BDTO raa62bDTOsq = ibims608bMapper.getLglSq(lglInfo); 		// 일련번호 MAX값 조회

			if (raa62bDTOsq == null) {										// null일때 sq 1로 변경
				raa62bDTOsq = new IBIMS608BDTO();
				raa62bDTOsq.setSn(Integer.valueOf(1));
			}

			int maxSq = raa62bDTOsq.getSn();

			lglInfo.setSn(maxSq);
			lglInfo.setFstRgstPEno(facade.getDetails().getEno());
			lglInfo.setHndEmpno(facade.getDetails().getEno());

			return ibims608bMapper.registLglInfo(lglInfo);  				// 법적절차 등록
		} else {
			lglInfo.setHndEmpno(facade.getDetails().getEno());
			return ibims608bMapper.updateLglInfo(lglInfo);  				// 법적철차 수정
		}
	}

	// 법적절차 삭제
	@Override
	public int deleteLglInfo(IBIMS608BDTO lglInfo) {
		
		return ibims608bMapper.deleteLglInfo(lglInfo);
		
	}

	
	//-----------------------TAB4 시효관리-----------------------//
	// 시효관리 조회
	@Override
	public List<IBIMS609BVO> getEfctDetail(IBIMS609BDTO efctInfo) {
		
		return ibims609bMapper.getEfctDetail(efctInfo);
	}
	
	// 시효관리 저장
	@Override
	public int registEfctInfo(IBIMS609BDTO efctInfo) {

		int sq = efctInfo.getSn();

		efctInfo.setHndlPEno(facade.getDetails().getEno());

		if (Integer.toString(sq).equals("0")) {
			IBIMS609BDTO raa62bDTOsq = ibims609bMapper.getEfctSq(efctInfo); 		// 일련번호 MAX값 조회

			if (raa62bDTOsq == null) {										// null일때 sq 1로 변경
				raa62bDTOsq = new IBIMS609BDTO();
				raa62bDTOsq.setSn(Integer.valueOf(1));
			}

			int maxSq = raa62bDTOsq.getSn();

			efctInfo.setSn(maxSq);
			efctInfo.setFstRgstPEno(facade.getDetails().getEno());
			efctInfo.setHndEmpno(facade.getDetails().getEno());

			return ibims609bMapper.registEfctInfo(efctInfo);  				// 법적절차 등록
		} else {
			efctInfo.setHndEmpno(facade.getDetails().getEno());
			return ibims609bMapper.updateEfctInfo(efctInfo);  				// 법적철차 수정
		}
	}

	// 시효관리 삭제
	@Override
	public int deleteEfctInfo(IBIMS609BDTO efctInfo) {
		
		return ibims609bMapper.deleteEfctInfo(efctInfo);
		
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

		/* 연결할 안건의 심사진행상태코드 체크 후 501이 아닐 시 오류메세지 송출 */
		String ibDealNo =  cnctInfo.getCnctIbDealNo();
		String riskInspctCcd = cnctInfo.getCnctRiskInspctCcd();
		String lstCCaseCcd = cnctInfo.getCnctLstCCaseCcd();

		IBIMS103BDTO inputParam = new IBIMS103BDTO();
		inputParam.setDealNo(ibDealNo);
		inputParam.setJdgmDcd(riskInspctCcd);
		inputParam.setMtrDcd(lstCCaseCcd);
		IBIMS103BDTO checkInspctPrgrsStCd = ibims103bMapper.copyDeal103B(inputParam);

		if( !"501".equals(checkInspctPrgrsStCd.getMtrPrgSttsDcd()) ) {
			return 501;
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
