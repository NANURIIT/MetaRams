package com.nanuri.rams.com.acctPrcs;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.com.dto.EtprCrdtGrntAcctProcDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class EtprCrdtGrntAcctProc {

	/* 딜승인기본 */
	@Autowired
	private final IBIMS201BMapper ibims201BMapper;
	/* 약정기본 */
	@Autowired
	private final  IBIMS401BMapper ibims401BMapper;
	/* 딜실행기본 */
	@Autowired
	private final IBIMS402BMapper ibims402BMapper;
	/* 로그인 사용자 정보 */
	@Autowired
	private final AuthenticationFacade facade;

	/**
	 * 회계처리모듈
	 * @param 
	 * @return
	 */
	public EtprCrdtGrntAcctProcDTO acctPrcs(EtprCrdtGrntAcctProcDTO paramData) {

		EtprCrdtGrntAcctProcDTO resultAcctProcDto = new EtprCrdtGrntAcctProcDTO();
		String cpltYn = "Y";											//완료여부
		
	    String baseDt                   = LocalDate.now().toString().replace("-", ""); 
        String sTrdt                    = ""; // 거래일자 : 회계반영일자
        String sCano    			   	= ""; // 계좌번호
        String strTrSeq 			   	= ""; // 거래순번
        String sAdmnOrgno               = ""; // 관리조직번호
        String sAdmnOrgno1              = ""; // 변경후관리조직번호(G6:수관용)
        String strCrdtGrntTrKindCd 		= ""; // 기업신용공여거래종류코드(10:실행,20:상환,21:수수료수납,99:결산)
        String strActgAfrsCd  			= ""; // 회계업무코드(G1:실행,G2:상환,G3:수수료수납,G4:결산,G5:이관,G6:수관, N1:관리회계결산)
		String sActgUnitAfrsCd 			= ""; // 회계단위업무코드
		String sActgCrtnTypeCd          = ""; // 회계생성유형코드(01:관리회계, 02:재무회계, (03:관리회계감액처리, 04:관리회계증감처리))
		String sThcoWhldYn              = ""; // 당사원천징수여부(상환)
		String strPAI_RDMP_DCD          = ""; // 상관구분코드
		String strTR_CRCY_CD            = ""; // 거래통화코드
		
		BigDecimal strWcrcTrslTrPrca    = BigDecimal.ZERO; // 원화환산거래원금
        BigDecimal strTrPrca	   	    = BigDecimal.ZERO; // 거래원금(통화코드가 KRW인 경우)
        BigDecimal strWcrcTrslTrIntAmt	= BigDecimal.ZERO; // 원화환산거래이자금액
        BigDecimal strTrIntAmt          = BigDecimal.ZERO; // 거래이자금액
        BigDecimal strCostAmt			= BigDecimal.ZERO; // 비용금액
        BigDecimal strVat               = BigDecimal.ZERO; // 부가세(전체SUM)
        String StrCrcyCd                = "";  // 통화코드
        BigDecimal decWcrcTrslRt        = BigDecimal.ZERO; // 원화환산율
        BigDecimal unitAmt				= BigDecimal.ZERO; // 단위금액(통화별)
        
        // SBSC_AMT35 금액세팅시 사용
		BigDecimal sbscAmt35	   	   	= BigDecimal.ZERO; // 자금팀(결제업무부 자체송금)
		BigDecimal trFeeAmt             = BigDecimal.ZERO; // 거래수수료금액
		BigDecimal vat533               = BigDecimal.ZERO; // 부가세
		BigDecimal strWcrcTrslTrFeeAmt	= BigDecimal.ZERO; // 원화환산거래수수료금액
		BigDecimal strWcrcTrslCostAmt   = BigDecimal.ZERO; // 원화환산비용금액
		BigDecimal wcrcTrslVat          = BigDecimal.ZERO; // 원화환산부가세
		//BigDecimal wcrcTrslTrPrca       = BigDecimal.ZERO; // 원화환산거래원금
		BigDecimal wcrcTrslSbscAmt35    = BigDecimal.ZERO; // 자금팀(결제업무부 자체송금)_외화
        
        String sDealNo 				    = ""; // 딜번호
        long   iExcSn						; // 실행순번
        String sRvseCnclTrSeq           = ""; // 정정취소거래순번(취소시)
        String sCanYn                   = ""; // 취소여부
        
        String sRkfrdt 		            = ""; // 기산일자
		String sIntBnaoDcd              = ""; // 이자선후취구분코드
         
		String strEtprCrdtGrntFeeKindCd	= ""; // 수수료종류코드
        BigDecimal dtimeRcgnAmt 		= BigDecimal.ZERO; // 일시인식금액
        BigDecimal dfrFeeAmt 			= BigDecimal.ZERO; // 이연수수료금액
        
		String strActsCd                = ""; // 계정과목코드
		String strEprzCrdlPrdtMdclCd	= ""; // 기업여신상품중분류코드
		String strFndsDvsnCd		    = ""; // 자금구분코드
		
		
		String strExcNm = "";
		// 상환, 결산은 넣어준다.
		strCrdtGrntTrKindCd = paramData.getEtprCrdtGrntTrKindCd() == null ? "" : paramData.getEtprCrdtGrntTrKindCd();
		if("10".equals(strCrdtGrntTrKindCd))        {	strExcNm = "실행";
		} else if("20".equals(strCrdtGrntTrKindCd)) {	strExcNm = "상환";
		} else if("21".equals(strCrdtGrntTrKindCd)) {	strExcNm = "수수료수납";
		} else if("22".equals(strCrdtGrntTrKindCd)) {	strExcNm = "수수료지급";
		} else if("81".equals(strCrdtGrntTrKindCd)) {	strExcNm = "매수";
		} else if("82".equals(strCrdtGrntTrKindCd)) {	strExcNm = "매도";
		} else if("99".equals(strCrdtGrntTrKindCd)) {}	strExcNm = "결산";
		
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("############################### "+strCrdtGrntTrKindCd+" 회계모듈 호출  #############################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		
		
		// 딜승인기본
        IBIMS201BVO ibims201bvo = ibims201BMapper.selectOnlyOneIBIMS201B(paramData.getPrdtCd());
        String prgSttsCd = ibims201bvo.getPrgSttsCd(); // 진행상태조회
        
		// 여신기본
        IBIMS401BDTO in401bdto = new IBIMS401BDTO();
        in401bdto.setPrdtCd(paramData.getPrdtCd());
		IBIMS401BVO ibims401bvo = ibims401BMapper.getIBIMS401BInfo(in401bdto);
		StrCrcyCd         	  = ibims401bvo.getCrryCd()      == null ? "" : ibims401bvo.getCrryCd(); 	  // 통화코드
		sIntBnaoDcd       	  = ibims401bvo.getIntrBnaoDcd() == null ? "" : ibims401bvo.getIntrBnaoDcd(); // 이자선후급구분코드
		sActgUnitAfrsCd   	  = ibims201bvo.getAcctUnJobCd() == null ? "" : ibims201bvo.getAcctUnJobCd(); // 회계단위업무코드
		strEprzCrdlPrdtMdclCd = ibims201bvo.getPrdtMdclCd()  == null ? "" : ibims201bvo.getPrdtMdclCd();  // 기업여신상품중분류코드
		
		// 딜실행정보
		IBIMS402BVO in402bvo = new IBIMS402BVO();
		in402bvo.setPrdtCd(paramData.getPrdtCd());
		in402bvo.setExcSn(paramData.getExcSn());
		IBIMS402BVO ibims402bvo = ibims402BMapper.selectOneIBIMS402B(in402bvo);
		
		
		// 거래일자 미입력시 당영업일
		sTrdt    = paramData.getTrDt()  == null ? baseDt : paramData.getTrDt();
		sCanYn   = paramData.getCanYn() == null ? "N"    : paramData.getCanYn();
		iExcSn   = paramData.getExcSn() == 0    ? 0      : paramData.getExcSn();
		
		// 상환구분코드
		strPAI_RDMP_DCD = ibims201bvo.getPaiRdmpDcd();
		
		sRkfrdt = paramData.getRkfrDt() == null ? "" : paramData.getRkfrDt();

		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("############################### "+strExcNm+" 회계모듈 종료   #############################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		System.out.println("###############################################################################################");
		resultAcctProcDto.setCpltYn(cpltYn);
		return resultAcctProcDto;	
	}
	
}
