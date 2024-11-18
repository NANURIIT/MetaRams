package com.nanuri.rams.business.assessment.tb04.tb04010;

import java.util.List;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS104BDTO;
import com.nanuri.rams.business.common.dto.IBIMS105BDTO;
import com.nanuri.rams.business.common.dto.IBIMS106BDTO;
import com.nanuri.rams.business.common.dto.IBIMS107BDTO;
import com.nanuri.rams.business.common.dto.IBIMS108BDTO;
import com.nanuri.rams.business.common.dto.IBIMS109BDTO;
import com.nanuri.rams.business.common.dto.IBIMS110BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS100BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS104BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS105BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS106BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS107BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS108BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS109BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS110BMapper;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.IBIMS105BVO;
import com.nanuri.rams.business.common.vo.IBIMS106BVO;
import com.nanuri.rams.business.common.vo.IBIMS107BVO;
import com.nanuri.rams.business.common.vo.IBIMS108BVO;
import com.nanuri.rams.business.common.vo.IBIMS109BVO;
import com.nanuri.rams.business.common.vo.IBIMS110BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB04010ServiceImpl implements TB04010Service {

	private final IBIMS100BMapper ibims100bMapper;
	private final IBIMS103BMapper ibims103bMapper;
	private final IBIMS104BMapper ibims104bMapper;
	private final IBIMS105BMapper ibims105bMapper;
	private final IBIMS106BMapper ibims106bMapper;
	private final IBIMS107BMapper ibims107bMapper;
	private final IBIMS108BMapper ibims108bMapper;
	private final IBIMS109BMapper ibims109bMapper;
	private final IBIMS110BMapper ibims110bMapper;

	@Autowired
	private AuthenticationFacade facade;

	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@Override
	public List<IBIMS103BVO> getDealList(IBIMS103BVO dealInfo) {
		return ibims103bMapper.getDealList(dealInfo); 
	}

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	@Override
	public IBIMS103BDTO getDealDetailInfo(IBIMS103BDTO dealDto) {
		return ibims103bMapper.selectOne103B(dealDto);
	}

	// deal 심사요청
	@Override
	public int assesmentRequest(IBIMS103BDTO param) {
		
		/* IBIMS100B INSERT를 위한 VO 인스턴스화 */
		IBIMS100BVO.selectVO ibims100BVO = new IBIMS100BVO.selectVO();
		
		String mtrPrgSttsDcd = param.getMtrPrgSttsDcd();
		
		IBIMS103BDTO s103b = ibims103bMapper.selectOne103B(param);

		s103b.setMtrPrgSttsDcd(mtrPrgSttsDcd);
		s103b.setHndEmpno(facade.getDetails().getEno());
		

		param.setLastYn("0");
		ibims103bMapper.updateLastYn(param);

		if (mtrPrgSttsDcd.equals("202")) {
			
			ibims100BVO.setEmpno(facade.getDetails().getEno());					// 사원번호 					
			ibims100BVO.setWorkDcd("01");                              			// 작업구분코드
			ibims100BVO.setWorkCtns("(결재) 심사신청관리");                     // 작업내용
			ibims100BVO.setRqstEmpno(facade.getDetails().getEno());             // 등록사원번호
			ibims100BVO.setMenuId("/TB04010S");                               	// 메뉴ID 
			ibims100BVO.setEntpNm(param.getEntpNm());                           // 업체명 
			ibims100BVO.setRmrk("dealNo=" + param.getDealNo());                 // 비고(메뉴별조회KEY)
			ibims100BVO.setHndEmpno(facade.getDetails().getEno());              // 조작사원번호
			
			ibims100bMapper.insertIBIMS100BInfo(ibims100BVO);
			
		} else if (mtrPrgSttsDcd.equals("203")) {
			
			ibims100BVO.setRmrk(param.getDealNo());
			ibims100BVO.setEmpno(facade.getDetails().getEno());
			ibims100BVO.setHndEmpno(facade.getDetails().getEno());
			ibims100BVO.setMenuId("/TB04010S"); 
			
			ibims100bMapper.deleteIBIMS100BInfo(ibims100BVO);
		} 

		// 자체전결
		if (mtrPrgSttsDcd.equals("309")) 
		{
			LocalDateTime now = LocalDateTime.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
			String time = now.format(formatter);
			s103b.setOwnPEno(facade.getDetails().getEno());				// 작성자 사번
			s103b.setBusiDptOpnn("자체전결 안건입니다.");	// 사업부부서의견
			s103b.setJdgmDptOpnn("자체전결 안건입니다.");	// 심사부부서의견
			s103b.setCnsbMtgNo("0");						  // 회의번호 0
			s103b.setOwnDt(time);									  // 심사역 배정일자
			s103b.setRiskInspctRsltnCcd("0");	  // 리스크심사결의구분코드 자체전결
		}
		
		return ibims103bMapper.insert103B(s103b);
	}

	// ---------------tab1 start------------------
	// 안건등록
	@Override
	public int registDealInfo(IBIMS103BDTO paramData) {
		
		IBIMS103BDTO temp = ibims103bMapper.selectOne103B(paramData);
		
		paramData.setHndEmpno(facade.getDetails().getEno());
		
		if(temp != null) {			// already exist
			temp.setLastYn("0");
			ibims103bMapper.updateLastYn(temp);
		}
		return ibims103bMapper.insert103B(paramData);
	}

	// 안건일괄삭제
	@Override
	@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
	public int deleteDealInfo(IBIMS103BDTO paramData) {
		// 심사진행상태코드가 심사정보저장, 심사요청취소 상태가 아닌경우 삭제불가.
		try {
			ibims103bMapper.deleteDealListInfo(paramData);
			// 관련문서 파라미터 세팅
			IBIMS104BDTO ibims104bDto = new IBIMS104BDTO();
			ibims104bDto.setDealNo(paramData.getDealNo());
			ibims104bDto.setMtrDcd(paramData.getMtrDcd());
			ibims104bDto.setJdgmDcd(paramData.getJdgmDcd());
			ibims104bMapper.deleteDocInfo(ibims104bDto);

			// 기초자산 파라미터 세팅
			IBIMS105BDTO ibims105bDto = new IBIMS105BDTO();
			ibims105bDto.setDealNo(paramData.getDealNo());
			ibims105bDto.setMtrDcd(paramData.getMtrDcd());
			ibims105bDto.setJdgmDcd(paramData.getJdgmDcd());
			ibims105bMapper.deleteAssetInfo(ibims105bDto);

			// 거래상대방 파라미터 세팅
			IBIMS106BDTO ibims106bDto = new IBIMS106BDTO();
			ibims106bDto.setDealNo(paramData.getDealNo());
			ibims106bDto.setMtrDcd(paramData.getMtrDcd());
			ibims106bDto.setJdgmDcd(paramData.getJdgmDcd());
			ibims106bMapper.deleteCncCmpnyInfo(ibims106bDto);

			// 내부등급 파라미터 세팅
			IBIMS107BDTO ibims107bDto = new IBIMS107BDTO();
			ibims107bDto.setDealNo(paramData.getDealNo());
			ibims107bDto.setMtrDcd(paramData.getMtrDcd());
			ibims107bDto.setJdgmDcd(paramData.getJdgmDcd());
			ibims107bMapper.deleteInsGrdInfo(ibims107bDto);

			// 담보 파라미터 세팅
			IBIMS108BDTO ibims108bDto = new IBIMS108BDTO();
			ibims108bDto.setDealNo(paramData.getDealNo());
			ibims108bDto.setMtrDcd(paramData.getMtrDcd());
			ibims108bDto.setJdgmDcd(paramData.getJdgmDcd());
			ibims108bMapper.deleteMrtgInfo(ibims108bDto);

			// 보증 파라미터 세팅
			IBIMS109BDTO ibims109bDto = new IBIMS109BDTO();
			ibims109bDto.setDealNo(paramData.getDealNo());
			ibims109bDto.setMtrDcd(paramData.getMtrDcd());
			ibims109bDto.setJdgmDcd(paramData.getJdgmDcd());
			ibims109bMapper.deleteEnsrInfo(ibims109bDto);

			// 책임준공 파라미터 세팅
			IBIMS110BDTO ibims110bDto = new IBIMS110BDTO();
			ibims110bDto.setDealNo(paramData.getDealNo());
			ibims110bDto.setMtrDcd(paramData.getMtrDcd());
			ibims110bDto.setJdgmDcd(paramData.getJdgmDcd());
			ibims110bMapper.deleteCmplInfo(ibims110bDto);
	} catch (Exception e) {
		System.out.println("deleteDealInfo ==> : " + e.getMessage());
	}
	
		return 1;
	}

	// ---------------tab2 start------------------

	// 관련문서목록 조회
	@Override
	public List<IBIMS104BDTO> getDocInfo(IBIMS104BDTO docInfo) {
		return ibims104bMapper.getDocInfo(docInfo);
	};

	// 관련문서정보 제거
	@Override
	public int deleteDocInfo(IBIMS104BDTO docInfo) {
		return ibims104bMapper.deleteDocInfo(docInfo);
	};
	
	// 관련문서정보 생성
	@Override
	public int registDocInfo(IBIMS104BDTO docInfo) {
		
		docInfo.setHndEmpno(facade.getDetails().getEno());

		docInfo.setDcmDcd("00");	// 문서구분코드

		if("Y".equals(docInfo.getLastDcmYn())) {
			ibims104bMapper.updateLastDcmYn(docInfo);
		}
		
		/**
		 * insert시 파라미터 null인 컬럼 하드코딩 TODO
		 */

		
		if (docInfo.getSn() == 0) {
			return ibims104bMapper.registDocInfo(docInfo);					// 문서정보 생성
		} else {
			return ibims104bMapper.updateDocInfo(docInfo);					// 문서정보 갱신
		}
	}

	// ---------------tab3 start------------------

	// 기초자산정보 취득
	@Override
	public List<IBIMS105BVO> getAssetInfo(IBIMS105BDTO assetInfo) {
		return ibims105bMapper.getAssetInfo(assetInfo);
	}

	// 기초자산정보 생성
	@Override
	public int registAssetInfo(IBIMS105BDTO assetInfo) {
		
		/**
		 * insert시 파라미터 null인 컬럼 하드코딩 TODO
		 */
		assetInfo.setHndEmpno(facade.getDetails().getEno());
		
		if (assetInfo.getSn() == 0) {
			return ibims105bMapper.registAssetInfo(assetInfo);					// 기초자산정보 생성
		} else {
			return ibims105bMapper.updateAssetInfo(assetInfo);					// 기초자산정보 갱신
		}
	}

	// 기초자산정보 제거
	@Override
	public int deleteAssetInfo(IBIMS105BDTO assetInfo) {
		return ibims105bMapper.deleteAssetInfo(assetInfo);						// 기초자산정보 제거
	}
	
	// 기초자산입력 예정 여부 생성
	@Override
	public int registBscAstsInptExptF(IBIMS103BDTO paramData) {
		
		IBIMS103BDTO temp = ibims103bMapper.selectOne103B(paramData);
		
		paramData.setLastYn("0");
		ibims103bMapper.updateLastYn(paramData);
		
		temp.setBscAstsInptExptF(paramData.getBscAstsInptExptF());
		temp.setHndEmpno(facade.getDetails().getEno());
		
		return ibims103bMapper.insert103B(temp);
	}

	// ---------------tab4 start------------------

	// 관계사정보 취득
	@Override
	public List<IBIMS106BVO> getCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo) {
		return ibims106bMapper.getRelatedCompanyInfo(cncCmpnyInfo);
	}

	// 관계사정보 생성
	@Override
	public int registCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo) {
		
		cncCmpnyInfo.setHndEmpno(facade.getDetails().getEno());
		/**
		 * insert시 파라미터 null인 컬럼 하드코딩 TODO
		 */
		cncCmpnyInfo.setTrsShpDcd("00");					// 신탁형태구분코드

		if (cncCmpnyInfo.getSn() == 0) {
			return ibims106bMapper.registCncCmpnyInfo(cncCmpnyInfo);						// 관계사 생성
		} else {
			return ibims106bMapper.updateCncCmpnyInfo(cncCmpnyInfo);					    // 관계사정보 갱신
		}
	}

	// 관계사정보 삭제
	@Override
	public int deleteCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo) {
		return ibims106bMapper.deleteCncCmpnyInfo(cncCmpnyInfo);
	}
	
	// 기초자산입력 예정 여부 생성
	@Override
	public int registCncCmpnyInptExptF(IBIMS103BDTO paramData) {
		
		IBIMS103BDTO temp = ibims103bMapper.selectOne103B(paramData);
		/**
		 * insert시 파라미터 null인 컬럼 하드코딩 TODO
		 */
		
		paramData.setLastYn("0");
		
		ibims103bMapper.updateLastYn(paramData);
		
		temp.setCncCmpnyInptExptF(paramData.getCncCmpnyInptExptF());
		temp.setHndEmpno(facade.getDetails().getEno());
		
		return ibims103bMapper.insert103B(temp);
		
	}

	// ---------------tab5 start------------------

	// 내부등급정보 취득
	@Override
	public List<IBIMS107BVO> getInsGrdInfo(IBIMS107BDTO insGrdInfo) {
		return ibims107bMapper.getInsGrdInfo(insGrdInfo);
	}

	// 내부등급정보 생성
	@Override
	public int registInsGrdInfo(IBIMS107BDTO insGrdInfo) {
		insGrdInfo.setHndEmpno(facade.getDetails().getEno());
		
		if (insGrdInfo.getSn() == 0) {
			return ibims107bMapper.registInsGrdInfo(insGrdInfo);						// 내부등급정보 생성
		} else {
			return ibims107bMapper.updateInsGrdInfo(insGrdInfo);					    // 내부등급정보 갱신
		}

	}

	// 내부등급정보 삭제
	@Override
	public int deleteInsGrdInfo(IBIMS107BDTO insGrdInfo) {
		return ibims107bMapper.deleteInsGrdInfo(insGrdInfo);
	}
	
	// 내부등급 예정 여부 생성
	@Override
	public int registInsGrdInptExptF(IBIMS103BDTO paramData) {
		
		IBIMS103BDTO temp = ibims103bMapper.selectOne103B(paramData);
		
		paramData.setLastYn("0");
		ibims103bMapper.updateLastYn(paramData);
		
		temp.setInsGrdInptExptF(paramData.getInsGrdInptExptF());
		temp.setHndEmpno(facade.getDetails().getEno());
		
		return ibims103bMapper.insert103B(temp);
	}
	

	// ---------------tab6 start------------------

	// 담보정보 취득
	@Override
	public List<IBIMS108BVO> getMrtgInfo(IBIMS108BDTO mrtgInfo) {
		return ibims108bMapper.getMrtgInfo(mrtgInfo);
	}

	// 담보정보 저장
	@Override
	public int registMrtgInfo(IBIMS108BDTO mrtgInfo) {
		mrtgInfo.setHndEmpno(facade.getDetails().getEno());
		
		if (mrtgInfo.getSn() == 0) {
			return ibims108bMapper.registMrtgInfo(mrtgInfo);							// 담보정보 생성
		} else {
			return ibims108bMapper.updateMrtgInfo(mrtgInfo);					    	// 담보정보 갱신
		}
	};

	// 담보정보 삭제
	@Override
	public int deleteMrtgInfo(IBIMS108BDTO mrtgInfo) {
		return ibims108bMapper.deleteMrtgInfo(mrtgInfo);
	}

	// ---------------tab7 start------------------

	// 보증기관정보 취득
	@Override
	public List<IBIMS109BVO> getEnsrInfo(IBIMS109BDTO ensrInfo) {
		return ibims109bMapper.getEnsrInfo(ensrInfo);
	}

	// 보증기관정보 저장
	@Override
	public int registEnsrInfo(IBIMS109BDTO ensrInfo) {
		ensrInfo.setHndEmpno(facade.getDetails().getEno());
		
		if (ensrInfo.getSn() == 0) {
			return ibims109bMapper.registEnsrInfo(ensrInfo);							// 보증기관정보 생성
		} else {
			return ibims109bMapper.updateEnsrInfo(ensrInfo);					    	// 보증기관정보 갱신
		} 
	}

	// 보증기관정보 삭제
	@Override
	public int deleteEnsrInfo(IBIMS109BDTO ensrInfo) {
		return ibims109bMapper.deleteEnsrInfo(ensrInfo);
	}
	
	// ---------------tab8 start------------------

	// 책임준공기관정보 취득
	@Override
	public List<IBIMS110BVO> getCmplInfo(IBIMS110BDTO cmplInfo) {
		return ibims110bMapper.getCmplInfo(cmplInfo);
	}

	// 책임준공기관정보 저장
	@Override
	public int registCmplInfo(IBIMS110BDTO cmplInfo) {
		cmplInfo.setHndEmpno(facade.getDetails().getEno());
		/**
		 * insert시 파라미터 null인 컬럼 하드코딩 TODO
		 */
		BigDecimal mtrtHldAmt = new BigDecimal("000000000000000000000000.000000");	// 만기보유금액
		cmplInfo.setMtrtHldAmt(mtrtHldAmt);
		
		if (cmplInfo.getSn() == 0) {
			return ibims110bMapper.registCmplInfo(cmplInfo);							// 보증기관정보 생성
		} else {
			return ibims110bMapper.updateCmplInfo(cmplInfo);					    	// 보증기관정보 갱신
		}
	}

	// 책임준공기관정보 삭제
	@Override
	public int deleteCmplInfo(IBIMS110BDTO cmplInfo) {
		return ibims110bMapper.deleteCmplInfo(cmplInfo);
	}
}
