package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS420BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class IBIMS420BVO extends IBIMS420BDTO {
	
	private String rgstSttsCd;			/* 등록상태코드 */
	private String prarDt;				/* 예정일자 */
	private String feeBnapDcd;			/* 수수료선후급구분코드 */
	private String feeKndCd;			/* 수수료종류코드 */
	private String feeRcogDcd;			/* 수수료인식구분코드 */
	private String txtnTpDcd;			/* 과세유형구분코드 */
	private BigDecimal feeStdrAmt;		/* 수수료기준금액 */
	private String prcsCpltYn;			/* 처리완료여부 */
	private String crryCd;				/* 통화코드 */
	private String feeRcivDt;			/* 수수료수납일자 */
	private BigDecimal feeRcivAmt;		/* 수수료수납금액 */
	private String mngCnfmYn;			/* 경영확인여부 */
	private String inogCnfmYn;			/* 출납확인여부 */
	private String taffCnfmYn;			/* 세무확인여부 */
	private BigDecimal pymtFee;			/* 지급수수료 */
	private String rqsRgstYn;			/* 신청등록여부 */
	private String rpsrNm;				/* 대표자명 */
	private String rgstBdcd;			/* 등록부점코드 */
	private String rctmDt;				/* 입금일자 */
	private String trDt;				/* 거래일자 */
	private String trOthrDscmNo;		/* 거래상대방식별번호 */
	private String entpNm; 				/* 거래처명 */

	// TB07190S Data
	private String dealNo;					// 딜번호
	private String dealNm;					// 딜명
	private String actsCd;					// 계정과목코드
	private String bzepName;            	// 기업체명 	
	private String ardyBzepNo;				// 기업체번호
    private String ctrcDt;          		// 약정일자
    private String ctrcExpDt;           	// 약정만기일자
    private BigDecimal eprzCrdlCtrcAmt; 	// 약정금액
    private String feeName;             	// 수수료명
	private String etprCrdtGrntTrKindCd;	// 기업신용공여거래종류코드
	private String actgAfrsCd;				// 회계업무코드
	private BigDecimal wcrcTrslRt;			// 원화환산율
	private BigDecimal wcrcTrslTrFeeAmt;	// 원화환산거래수수료금액
	private String trStatCd;				// 거래상태코드
	private String prdtNm;					// 상품명
	private String acctUnJobCd;				// 회계단위업무코드
	
	private String strYmd;					// 시작일자
	private String endYmd;					// 종료일자
	private String dprtCd;					// 부서코드
	
	private String strPrarDt;			/* 예정일_시작일자*/
	private String endPrarDt;			/* 예정일_종료일자*/
	private String empNo;				/* 담당자사번*/
	
	private String hndEmpnm;				/* 조작사원명*/
	private String chrrEmpno;				/* 담당자사원번호*/
	private String chrrEmpnm;				/* 담당자사원명*/
	
	private String hndDetlDtmStr; 				/* 조작상세일시 */
	
	// private IBIMS010BDTO ibims010bdto;
	// private IBIMS101BDTO ibims101bdto;
	// private IBIMS201BDTO ibims201bdto;
	// private IBIMS348BDTO ibims348bdto;
	// private IBIMS401BDTO ibims401bdto;
	// private IBIMS410BDTO ibims410bdto;
	// private IBIMS421BDTO ibims421bdto;

	private List<IBIMS420BVO> getTB07190S;
	
}
