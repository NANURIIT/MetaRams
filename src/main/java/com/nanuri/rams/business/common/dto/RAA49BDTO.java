package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 일별리스크심사통합포지션정보 Table.RAA49B DTO
 * */
public class RAA49BDTO {
	private String stdDt; 				// 기준일자
	private int    sq;					// 일련번호
	
	private String astsDstgChrsNo;		// 자산식별고유번호
	private String cmbsBkno;			// 자본시장표준IT시스템북번호
	private String estDtlCntnt;			// 설정세부내용
	private String gdsFndCd;			// 상품펀드코드
	private String stndIsCd;			// 표준종목코드
	private String actCd;				// 계정코드
	private String actSbjtCd;			// 계정과목코드
	private String rcgNo;				// 승인번호
	private String ibRcgNo;				// IB승인번호
	private String riskRcgNo;			// 리스크승인번호
	private String ibDealNo;			// IBDeal번호
	private String riskInspctCcd;		// 리스크심사구분코드
	private String lstCCaseCcd;			// 부수안건구분코드
	private String mktRskInsTrgtF; 		// 시장위험내부대상여부
	private String mktRskStndTrgtF; 	// 시장위험표준대상여부
	private String crdtRskStndTrgtF;	// 신용위험표준대상여부
	private String lqdtyRskTrgtF;		// 유동성위험대상여부
	private String dctnF;				// 차감여부
	private String addtRqstStsfctF;		// 가산요건만족여부
	private String hdgWyCcd;			// 해지방법구분코드
	private String insReGdsCd;			// 내재상품코드
	private String hnglIsNm;			// 한글종목명
	private String wrapGdsCd;			// WRAP상품코드
	private String wrapGdsNm;			// WRAP상품명
	private String ctrtNo;				// 계약번호
	private String dlCrPrtyIdNm;		// 거래상대방ID명
	private String trdCcd;				// 매매구분코드
	private String isDtlTypCd;			// 종목세부유형코드
	private String hdqtCd;				// 본부코드
	private String mngDprtCd;			// 관리부점코드
	private String deskIdNm;			// 데스크ID명
	private String dlIdNm;				// 딜러ID명
	private String bookCd;				// BOOK코드
	private String bsnssActnCcd;		// 영업활동구분코드
	private int    blncQ;				// 잔고수량
	private int    opnPrcValAmt;		// 시가평가금액
	private int    acqstAmt;			// 취득금액
	private int    bkAmt;				// 장부금액
	private int    stdPrc;				// 기준가격
	private int    mktPrcAmt;			// 시장가금액
	private String rcgDt;				// 승인일자
	private String ctrtCclsDt;			// 계약체결일자
	private String ctrtStrtDt;			// 계약시작일자
	private String ctrtMtrtDt;			// 계약만기일자
	private int    ctrtMltplr;			// 계약승수
	private String mtrtDt;				// 만기일자
	private String extnsMtrtDt;			// 연장만기일자
	private String astsQtyDvdCd;		// 자사건정성분류코드
	private int    arrsAmt;				// 연체금액
	private String arrsStrtDt;			// 연체시작일자
	private String itstArrsF;			// 이자연체여부
	private String prVlCrncyCd;			// 액면통화코드
	private String cncOtcGdsCd;			// 연결OTC상품코드
	private String dshnrAstsF;			// 부도자산여부
	private int    alwAmt;				// 충당금
	private String stndMdlGdsGrpCd;		// 표준모형상품그룹코드
	private int    krwRa;				// 원화잔액
	private int    crncyNmnlAmt;		// 통화명목금액
	private int    krwNmnlAmt1;			// 통화명목금액1
	private String secDvdCd;			// 섹터분류코드
	private String inclAstsDvdCd;		// 편입자산분류코드
	private String bscAstsDvdCd;		// 기초자산분류코드
	private String fndMktF;				// 펀드시장여부
	private String fndTypCcd;			// 펀드유형구분코드
	private String outsInsDlCcd;		// 외부내부거래구분코드
	private String itemCcd;				// 항목구분코드
	private String wthldSysCd;			// 원천시스템코드
	private String wthldTblNm;			// 원천테이블명
	private Date   fnlUptDyTm;			// 최종변경일시
	
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlPEno;			// 처리자사번

} 
