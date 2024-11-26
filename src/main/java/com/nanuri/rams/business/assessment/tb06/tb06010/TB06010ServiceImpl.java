package com.nanuri.rams.business.assessment.tb06.tb06010;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS105BDTO;
import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS202BDTO;
import com.nanuri.rams.business.common.dto.IBIMS205BDTO;
import com.nanuri.rams.business.common.dto.IBIMS208BDTO;
import com.nanuri.rams.business.common.dto.IBIMS209BDTO;
import com.nanuri.rams.business.common.dto.IBIMS346BDTO;
import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS100BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS105BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS112BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS202BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS205BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS208BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS209BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS212BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS220BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS346BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.vo.IBIMS105BVO;
import com.nanuri.rams.business.common.vo.IBIMS112BVO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS205BVO;
import com.nanuri.rams.business.common.vo.IBIMS208BVO;
import com.nanuri.rams.business.common.vo.IBIMS209BVO;
import com.nanuri.rams.business.common.vo.IBIMS220BVO;
import com.nanuri.rams.business.common.vo.IBIMS220BVO2;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.TB06010SVO;
import com.nanuri.rams.business.common.vo.TB06013PVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;
import com.nanuri.rams.com.utils.StringUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06010ServiceImpl implements TB06010Service {

	private final IBIMS103BMapper ibims103bMapper;
	private final IBIMS105BMapper ibims105bMapper;
	private final IBIMS205BMapper ibims205bMapper;
	private final IBIMS112BMapper ibims112bMapper;
	private final IBIMS201BMapper ibims201bMapper;
	private final IBIMS202BMapper ibims202bMapper;
	private final IBIMS208BMapper ibims208bMapper;
	private final IBIMS209BMapper ibims209bMapper;
	private final IBIMS212BMapper ibims212bMapper;
	private final IBIMS220BMapper ibims220bMapper;
	private final IBIMS346BMapper ibims346bMapper;
	private final IBIMS401BMapper ibims401BMapper;
	private final IBIMS401HMapper ibims401HMapper;
	private final IBIMS404BMapper ibims404BMapper;
	/* 오늘의 할 일 */
	private final IBIMS100BMapper ibims100bMapper;

	private final AuthenticationFacade facade;

	// 대출계약 승인정보관리 조회
	@Override
	public TB06010SVO getCnfrncDealInfo(TB06010SVO searchParam) {
		return ibims103bMapper.selectTB06010SVO(searchParam);
	}

	// 상환구분/금리정보 조회
	@Override
	public IBIMS202BDTO selectIBIMS202BDTOInfo(IBIMS202BDTO param) {
		return ibims202bMapper.selectIBIMS202BDTOInfo(param);
	}

	// 상환구분/금리정보 등록
	@Transactional
	@Override
	public int registIBIMS202BDTOInfo(IBIMS202BDTO param) {
		
		String rfkDt = LocalDate.now().toString().replace("-", "");
		int result = -1;
		IBIMS202BDTO temp = ibims202bMapper.selectIBIMS202BDTOInfo(param);

		param.setHndEmpno(facade.getDetails().getEno());
		IBIMS201BVO ibims201bvo = ibims201bMapper.selectOnlyOneIBIMS201B(param.getPrdtCd());

		ibims201bvo.setPaiRdmpDcd(param.getPaiRdmpDcd());				// 상환구분
		ibims201bvo.setFxnIntrt(param.getFxnIntrt());					// 고정금리
		ibims201bvo.setAddIntrt(param.getAddIntrt());					// 가산금리
		ibims201bvo.setPrnaRdmpFrqcMnum(param.getPrnaRdmpFrqcMnum());	// 상환주기
		ibims201bvo.setIntrtCngeFrqcMnum((param.getIntrtCngeFrqcMnum()==null)?0:param.getIntrtCngeFrqcMnum());	//변동주기
		ibims201bvo.setOvduIntrRtDcd(param.getOvduIntrRtDcd());			//연체이자율구분
		ibims201bvo.setOvduIntrRt(param.getOvduIntrRt());				//연체이자율
		ibims201bvo.setPrnaDfrPrdMnum((param.getPrnaDfrPrdMnum()==null)?0:param.getPrnaDfrPrdMnum());		//거치기간
		ibims201bvo.setIntrBnaoDcd(param.getIntrBnaoDcd());				//선후취구분
		ibims201bvo.setIntrRdmpFrqcMnum(param.getIntrRdmpFrqcMnum());	//이자상환주기
		ibims201bvo.setIntrDnumClcMthCd(param.getIntrDnumClcMthCd());	//일수계산방법
		ibims201bvo.setIstmDtmRdmpAmt(param.getIstmDtmRdmpAmt());		//만기상환금액
		ibims201bvo.setTfdLyAplyDcd(param.getTfdLyAplyDcd());			//초일말일산입
		ibims201bvo.setIntrSnnoPrcsDcd(param.getIntrSnnoPrcsDcd());		//이자단수법
		ibims201bvo.setHldyPrcsDcd(param.getHldyPrcsDcd());				//휴일처리구분
		ibims201bvo.setIntrClcEndDeDcd(param.getIntrClcEndDeDcd());		//이자계산종료일
		ibims201bvo.setStdrIntrtKndCd(param.getStdrIntrtKndCd());
		ibims201bvo.setEqlRdmpAmt(param.getEqlRdmpAmt());
		ibims201bvo.setRcvbIntrAplyIrt(param.getRcvbIntrAplyIrt());
		ibims201bvo.setIntrHdwtClcYn(param.getIntrHdwtClcYn());
		ibims201bvo.setRgstDt(param.getRgstDt());
		ibims201bvo.setLastYn("1");
		ibims201bvo.setApvlDt(LocalDate.now().toString().replace("-", ""));
		ibims201bvo.setHndEmpno(param.getHndEmpno());
		ibims201bvo.setRgstDt(param.getRgstDt());
		ibims201bvo.setEarlyRepayYn(param.getEarlyRepayYn());				//중도상환여부
		ibims201bvo.setRqsKndCd(param.getRqsKndCd());					//신청종류
		
		if (temp == null) {
			result = ibims202bMapper.insertIBIMS202BDTOInfo(param);
		} else {
			result = ibims202bMapper.updateIBIMS202BDTOInfo(param);
		}
		
		if( result > 0 ) {
			ibims201bMapper.updateIBIMS201BDTO(ibims201bvo);
		}

		// RQS_KND_CD	기업여신신청종류코드
		// 기한연장+금리변경(31)
		// 금리변경(04)
		// 차주변경+금리변경(61)
		if(("31".equals(param.getRqsKndCd()))
		 ||("04".equals(param.getRqsKndCd()))
		 ||("61".equals(param.getRqsKndCd()))) {
			
			IBIMS346BDTO out346bdto = ibims346bMapper.selectIBIMS346BInfo(param.getPrdtCd());
			
			if(out346bdto == null) {
				;
			} else {

				out346bdto.setStdrIntrtKndCd(param.getStdrIntrtKndCd());
				if(rfkDt.equals(out346bdto.getAplyStrtDt())) {

					out346bdto.setFxnIntrt(param.getFxnIntrt());
					out346bdto.setAddIntrt(param.getAddIntrt());
					result = ibims346bMapper.updateIBIMS346B(out346bdto);
										
				} else {
					
					out346bdto.setAplyEndDt(DateUtil.dayAdd(rfkDt, -1));
					result = ibims346bMapper.updateIBIMS346B(out346bdto);
					
					out346bdto.setAplyStrtDt(rfkDt);		
					out346bdto.setAplyEndDt("25001231");		
					out346bdto.setFxnIntrt(param.getFxnIntrt());
					out346bdto.setAddIntrt(param.getAddIntrt());
					result = ibims346bMapper.insertIBIMS346B(out346bdto);
					
				}
			}

		}
		
		return result;
	}

	// 종목정보 등록
	@Override
	@Transactional
	public int regPrdtCd(IBIMS201BVO param) {
		
		String rfkDt = LocalDate.now().toString().replace("-", "");
		String rqsKndCd = param.getRqsKndCd();
		int result = 0;
		param.setApvlDt(LocalDate.now().toString().replace("-", ""));
		String empNo = facade.getDetails().getEno();
		
		if ((param.getPrdtCd() == null)||("".equals(param.getPrdtCd()))) {
			
			param.setPrdtCd(ibims201bMapper.getPrdtCdSq(param.getPageDcd()));
			param.setHndEmpno(empNo);
			result = ibims201bMapper.regPrdtCd(param);
						
		} else {

	        IBIMS201BVO ibims201bvo = ibims201bMapper.selectOnlyOneIBIMS201B(param.getPrdtCd());
	        ibims201bvo.setLastYn("0");
	        result = ibims201bMapper.updateIBIMS201BDTO(ibims201bvo);
			
			IBIMS202BDTO in202bdto = new IBIMS202BDTO();
			in202bdto.setPrdtCd(param.getPrdtCd());
			IBIMS202BDTO out202bdto = ibims202bMapper.selectIBIMS202BDTOInfo(in202bdto);
			param.setPaiRdmpDcd(out202bdto.getPaiRdmpDcd());				// 상환구분
			param.setFxnIntrt(out202bdto.getFxnIntrt());					// 고정금리
			param.setAddIntrt(out202bdto.getAddIntrt());					// 가산금리
			param.setPrnaRdmpFrqcMnum(out202bdto.getPrnaRdmpFrqcMnum());	// 상환주기
			param.setIntrtCngeFrqcMnum((out202bdto.getIntrtCngeFrqcMnum()==null)?0:out202bdto.getIntrtCngeFrqcMnum());	//변동주기
			param.setOvduIntrRtDcd(out202bdto.getOvduIntrRtDcd());			//연체이자율구분
			param.setOvduIntrRt(out202bdto.getOvduIntrRt());				//연체이자율
			param.setPrnaDfrPrdMnum((out202bdto.getPrnaDfrPrdMnum()==null)?0:param.getPrnaDfrPrdMnum());		//거치기간
			param.setIntrBnaoDcd(out202bdto.getIntrBnaoDcd());				//선후취구분
			param.setIntrRdmpFrqcMnum(out202bdto.getIntrRdmpFrqcMnum());	//이자상환주기
			param.setIntrDnumClcMthCd(out202bdto.getIntrDnumClcMthCd());	//일수계산방법
			param.setIstmDtmRdmpAmt(out202bdto.getIstmDtmRdmpAmt());		//만기상환금액
			param.setTfdLyAplyDcd(out202bdto.getTfdLyAplyDcd());			//초일말일산입
			param.setIntrSnnoPrcsDcd(out202bdto.getIntrSnnoPrcsDcd());		//이자단수법
			param.setHldyPrcsDcd(out202bdto.getHldyPrcsDcd());				//휴일처리구분
			param.setIntrClcEndDeDcd(out202bdto.getIntrClcEndDeDcd());		//이자계산종료일
			param.setStdrIntrtKndCd(out202bdto.getStdrIntrtKndCd());		//기준금리종류코드
			param.setPrgSttsCd(ibims201bvo.getPrgSttsCd());                 //진행상태코드
			param.setEarlyRepayYn(out202bdto.getEarlyRepayYn());				//중도상환여부
			//param.setHndEmpno("");
			param.setLastYn("1");                                           //최종여부
//			param.setRqsKndCd("01");                                        //신청종류
			param.setHndEmpno(empNo);
			result = ibims201bMapper.regPrdtCd(param);
			
		}

		IBIMS103BDTO s103b = new IBIMS103BDTO();
		s103b.setDealNo(param.getDealNo());
		s103b.setMtrDcd(param.getMtrDcd());
		s103b.setJdgmDcd(param.getJdgmDcd());
		s103b.setHndEmpno(facade.getDetails().getEno());
		
		s103b = ibims103bMapper.selectOne103B(s103b);
		s103b.setLastYn("0");
		ibims103bMapper.updateLastYn(s103b);
		
		s103b.setLastYn("1");
		s103b.setMtrPrgSttsDcd("401");
		result = ibims103bMapper.insert103B(s103b);		
		
		
		List<IBIMS205BDTO> s205dto = ibims105bMapper.getAssetInfoBy201bDTO(param);

		if( s205dto.size() > 0 ) {
			ibims205bMapper.deleteIBIMS205B(param.getPrdtCd());
			for( int i = 0 ; i < s205dto.size() ; i ++ ) {
				s205dto.get(i).setPrdtCd(param.getPrdtCd());
				s205dto.get(i).setHndEmpno(facade.getDetails().getEno());
				// request transaction
				ibims205bMapper.insertIBIMS205B(s205dto.get(i));
			}
			
			
		}
	
		// RQS_KND_CD	기업여신신청종류코드 
		// 부서이수관(07)
		if("07".equals(rqsKndCd)) {
			
			IBIMS401BDTO in401bdto = new IBIMS401BDTO();
			in401bdto.setPrdtCd(param.getPrdtCd());
			IBIMS401BVO out401bdto = ibims401BMapper.getIBIMS401BBaseInfo(in401bdto);
			if(out401bdto == null) {
				;
			} else {
				out401bdto.setChrrEmpno(param.getChrrEmpno());
				out401bdto.setFrsMngmBdcd(param.getFrsMngmBdcd()); 	// 최초관리부서
				out401bdto.setMngmBdcd(param.getMngmBdcd()); 		// 관리부서
				out401bdto.setTrrcDt(rfkDt);                        // 이수관일자
				out401bdto.setHndEmpno(empNo);
				result = ibims401BMapper.updateIBIMS401B(out401bdto);
				result = ibims401HMapper.insertIBIMS401H(out401bdto);
			}
			
		}
		
		return result;
	}
	
	// 종목정보 삭제
	@Override
	public int deletePrdtCd(IBIMS201BVO param) {
		return ibims201bMapper.deletePrdtCd(param);
	}

	// 투자심사승인정보 등록
	@Transactional
	@Override
	public int regIBIMS208B(IBIMS208BVO param) {

		String empNo = facade.getDetails().getEno();
		
		if (StringUtil.isAllWhitespace(param.getSn())) {			// 등록
			
			param.setRgstEmpno(empNo);
			param.setRgstDt(param.getChngDt());
			param.setHndEmpno(empNo);
			param.setChngEmpno(empNo);
			
			return ibims208bMapper.insert208B(param);
		} else {													// 수정
			// select
			List<IBIMS208BVO> temp = ibims208bMapper.select208B(param);
			
			// update
			if(null != temp) {
				param.setHndEmpno(empNo);
				param.setChngEmpno(empNo);
				
				return ibims208bMapper.update208B(param);
				//return 1;
			} else {
				return 0;
			}
		}
	}

	// 투자심사승인정보 조회
	@Override
	public List<IBIMS208BVO> selectIBIMS208B(IBIMS208BVO param) {
		return ibims208bMapper.select208B(param);
	}

	// 투자심사승인정보 기본정보 조회
	@Override
	public IBIMS112BVO getAppvCndt(IBIMS112BDTO param) {
		return ibims112bMapper.getAppvCndt(param);
	}

	// 투자심사승인조건 연결
	@Override
	public int connectIBIMS209B(IBIMS209BVO param) {
		
		IBIMS209BDTO temp = ibims209bMapper.select209B(param);
		
		param.setHndEmpno(facade.getDetails().getEno());
		
		if (null != temp) {
			return ibims209bMapper.update209B(param);
		} else {
			return ibims209bMapper.insert209B(param);
		}
	}

	@Override
	public IBIMS208BDTO getIBIMS208BDTOInfo(IBIMS209BDTO param) {
		return ibims208bMapper.getIBIMS208BDTOInfo(param);
	}

	@Override
	public List<TB06013PVO> getIBIMS212BDTOInfo(TB06013PVO param) {
		return ibims212bMapper.getIBIMS212BDTOInfo(param);
	}
	
	@Override
	public List<IBIMS220BVO> getIBIMS220BDTOInfo(IBIMS220BVO param) {
		return ibims220bMapper.getIBIMS220BDTOInfo(param);
	}

	@Override
	public int insert100BInfo() {
		/* IBIMS100BDTO 인스턴스화 */
		IBIMS100BDTO param = new IBIMS100BDTO();
		
		/* parameter setting */
		param.setEmpno(facade.getDetails().getEno());			    // 사원번호 		
		param.setWorkDcd("03");                              	    // 작업구분코드
		param.setWorkCtns("(To-Do) 대출채권/채무보증 정보등록");    // 작업내용
		param.setRgstEmpno(facade.getDetails().getEno());           // 등록사원번호
		param.setMenuId("/TB06010S");                               // 메뉴ID 
		param.setEntpNm(param.getEntpNm());                         // 업체명 
		param.setRmrk("TEST");               						// 비고(메뉴별조회KEY)
		param.setHndEmpno(facade.getDetails().getEno());            // 조작사원번호

		return ibims100bMapper.insertIBIMS100BInfo(param);
	}

	@Override
	public int saveIBIMS220BDTOInfo(IBIMS220BVO2 param) {

		if (param.getItrList().size() > 0) {
			ibims220bMapper.delIBIMS220BDTOInfo(param.getPrdtCd());

			for (int i = 0; i < param.getItrList().size(); i++) {
				param.getItrList().get(i).setHndEmpno(facade.getDetails().getEno());
			}
			return ibims220bMapper.saveIBIMS220BDTOInfo(param.getItrList());
		} else {
			return ibims220bMapper.delIBIMS220BDTOInfo(param.getPrdtCd());
		}

	}
	
	@Override
	public int deleteAssetInfo(IBIMS205BDTO ibims205bDTO) {
		return ibims205bMapper.deleteOneIBIMS205B(ibims205bDTO);
	}

	@Override
	public int registAssetInfo(IBIMS205BDTO assetInfo) {
		/**
		 * insert시 파라미터 null인 컬럼 하드코딩 TODO
		 */
		assetInfo.setHndEmpno(facade.getDetails().getEno());
		
		if ("".equals(assetInfo.getBssAsstMngmNo())) {
			
			return ibims205bMapper.insertIBIMS205B(assetInfo);					// 기초자산정보 생성
		} else {
			return ibims205bMapper.updateIBIMS205B(assetInfo);					// 기초자산정보 갱신
		}
	}

	@Override
	public List<IBIMS205BVO> getAssetInfo(String prdtCd) {
		return ibims205bMapper.selectIBIMS205B(prdtCd);
	}


}
