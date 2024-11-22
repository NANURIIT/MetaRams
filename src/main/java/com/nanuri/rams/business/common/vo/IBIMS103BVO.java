package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * 딜기본정보 Table.IBIMS103B VO
 */
public class IBIMS103BVO extends IBIMS103BDTO {

	String mtrDcdNm;							// 안건구분코드명
	String jdgmDcdNm;							// 심사구분코드명
	String chrgPNm;								// 담당자명
	String ownPNm;								// 심사역명
	String dprtNm;								// 부점명
	String mtrPrgSttsDcdNm;						// 안건진행상태구분코드명
	
	/* --------------------------------------- */
	
	String rgstDt;
	String ownPDprtCd;
	String ownPDprtNm;
	String chrgPDprtCd;
	String chrgPDprtNm;
	String crryCd;
	String dmsCrdtGrdDcd;
	String dmsCrdtGrdDcdNm;
	String invNtnCdNm;
	String ptfdCrryCdNm;
	String invPrdtLclsCdNm;                // 투자상품대분류코드
    String invPrdtMdclCdNm;                // 투자상품중분류코드
    String invPrdtSclsCdNm;                // 투자상품소분류코드
    String invPrdtDtlsDvdCdNm;             // 투자상품상세분류코드
    
    /* --------------------------------------- */
    
    String dealNm;
    
    /* --------------------------------------- */
    
    String mtrPrgSttsDcdFrom;
    String mtrPrgSttsDcdTo;
    
    /* --------------------------------------- */
    String prdtCd;
    String prdtNm;
	/* ------------------- 20240613 정희조 추가 -------------------- */
	// 대시보드
	String pviusQtStrtDt;					// 전분기 시작일자
	String pviusQtEndDt;					// 전분기 종료일자

	// 협의체 부의 및 현황
	String mmStartDt;                       // 기준월 시작일자
	String mmEndDt;                         // 기준월 종료일자
	String weekStrtDt;                      // 이번주 시작일자
	String weekEndDt;                       // 이번주 종료일자
    String ibDealNo;                        // 딜번호
    String ibDealNm;                        // 딜명
    BigDecimal ptcpAmt;                     // 부의금액
	String riskInspctRsltnCcdNm;           	// 리스크심사결의구분코드명
	String riskInspctRsltnCcd;            	// 리스크심사결의구분코드
	String aplcExptDt;            			// 부의일정
	String wrtDt;            				// 기표예정일자

	// 협의체 부의 및 현황
	String cdVlId;            				// 구분코드
	String cdVlNm;            				// 구분명
	
	int agdBfr;								// 부의안건_전분기
	int agdAfr;								// 부의안건_조회시점
	int dropBfr;							// 자체드랍_전분기
	int dropAfr;							// 자체드랍_조회시점
	int aprveBfr;							// 가결(조건부포함)_전분기
	int aprveAfr;							// 가결(조건부포함)_조회시점
	int rjctBfr;							// 부결_전분기
	int rjctAfr;							// 부결_조회시점
	int holdBfr;							// 보류_전분기
	int holdAfr;							// 보류_조회시점
	int fnshBfr;							// 부의안건_전분기
	int fnshAfr;							// 부의안건_조회시점
	int waitBfr;							// 결의중_전분기
	int waitAfr;							// 결의중_조회시점
	// 투자자산 현황
			String colNm;					// 승인건수
			String stdYrMm; 				// 현재 기준년월
			String inspctDprtCcd;			// 심사부구분코드
		// ● 기표전
			String qtaPef; 					// 지분증권 - PEF
			String qtaPreIpo; 				// 지분증권 - PRE_IPO
			String qtaSpac; 				// 지분증권 - SPAC
			String qtaStock; 				// 지분증권 - 주식
			String qtaSbtl; 				// 지분증권 - 소계
			String invstSecur; 				// 집투증권
			String lnBnd; 					// 대출채권
			String accdtCmnt; 				// 우발채권 - 확약보증
			String accdtByng; 				// 우발채권 - 매입약정
			String accdtHug; 				// 우발채권 - HUG
			String accdtSbtl; 				// 우발채권 - 소계
			String total; 					// 합계
			
	/* --------------------------------------- */
	String apvlDt;							// 승인일자
	BigDecimal apvlAmt;						// 승인금액		
	String invJdgmComtNo;					// 투자심사위원회번호		
	String cnsbDcd;                         // 위원회번호		
	String sdnCndtF;                        // 셀다운조건여부		
	String etcCndtF;                        // 기타조건여부
			
}