package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class TB03020DTO {
    /* 기본정보 */
	private String selectedDeal;          // insert/update 구분
	private String ibDealNo;             // DEAL관리번호
	private int dealSq;                   // DEAL일련번호
	private String inspctPrgrsStCd;       // 진행상태코드
	private String dealNm;                // DEAL명
	private String bookCd;                // BOOK코드
	private String invstGdsLdvdCd;        // 투자상품대분류코드
	private String invstGdsMdvdCd;        // 투자상품중분류코드
	private String invstGdsSdvdCd;        // 투자상품소분류코드
	private String invstGdsDtlsDvdCd;     // 투자상품상세분류코
	private String coprtnTypCd;           // 협업유형코드
	private String invstNtnCd;            // 투자국가코드
	private String invstCityNm;           // 투자도시명
	private String dealCntnt;             // DEAL내용
	/* 기타정보 */
	private String cntcCorpNo;            // 시공사법인등록번호
	private String crdtManlF;             // 신용보감여부
	private double ltv;                   // LTV
	private String abrdLoclCorpAsctCd;    // 해외현지법인협회코
	private String etcCntnt;              // 기타내용
	/* 업체정보 */
	private String corpNo;                // 법인번호
	private String optrRgstNo;            // 사업자등록번호
	private String indTyp;                // 업종
	private String linTyp;                // 계열
	private String crdtGrdCd;             // 신용등급코드
	private String entpScal;              // 기업규모
	private String goPublMktCd;           // 주식상장시장코드
	/* 수익정보 */
	private double dealScal;              // DEAL규모
	private double ptctScal;              // 참여규모
	private double tlErnAmt;              // 전체수익금액
	private double prntYrErnAmt;          // 당해수익금액
	private double wrtErnAmt;             // 기표수익금액
	private double onGoinAmt;             // 이자수익금액
	private String invstCrncyCd;          // 투자통화코드
	private double invstCrncyAmt;         // 투자통화금액
	private String dealScalUdfeF;         // DEAL규모미정여부
	private String wrtDt;                 // 기표일자
	private String mtrtDt;                // 만기일자
	private String ptctScalUdfeF;         // 참여규모미정여부

	/* SellDown 정보 */
	List<RAC05BDTO> sellDownInfo;		  // 셀다운 정보

	/* 공동영업관리자 정보 */
	List<RAC06BDTO> mngPInfo;		  	  // 공동영업관리자 정보

	/* 결재자 */
	private String chrgHdqtCd;            // 담당본부코드
	private String chrgDprtCd;            // 담당부점코드
	private String chrgPEno;              // 담당자사번
	private String pyntHdqtCd;            // 결재본부코드
	private String pyntDprtCd;            // 결재부점코드
	private String pyntPEno;              // 결재자사번

	/* 공통사항 */
	private String hndlDprtCd;			  // 처리부점코드
	private String hndlPEno;			  // 처리자사번
	private String dltF;                  // 삭제여부
	private String fstHndlPEno;           // 최초등록자사번
	private String fstHndlDyTm;           // 최초등록일시
	private String lstHndlPEno;           // 최종변경자사번
	private String lstHndlDyTm;           // 최종변경일시

}
