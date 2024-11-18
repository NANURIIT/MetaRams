package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.Date;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 심사안건평가관리 Table.RAA02B VO
 * */
public class RAA02BVO {
	
	@Getter
	@Setter
	public static class AssignInfo{
		private String start;					//	검색 시작 날짜
		private String end;						//	검색 끝 날짜
		
		private String fstRgstDt;				//	배정일
		private String ibDealNo;				//	IBDEAL번호
		private String riskInspctCcd;			//	신규/재부의
		private String riskInspctCcdNm;			//	신규/재부의명
		private String lstCCaseCcd;				//	부수안건
		private String lstCCaseCcdNm;			//	부수안건명
		private String ibDealNm;				//	안건명
		private String ownpEno;					//	심사역
		private String ownpNm;					//	심사역이름
		private String hdqtCd;					//	본부
		private String hdqtCdNm;				//	본부명
		private String dprtNm;					//	부서
		private String chrgpEno;				//	직원
		private String coprtnTypCd;				//	협업유형
		private String inspctPrgrsStCd;			//	진행상태
		private String inspctPrgrsStCdNm;		//	진행상태명
	}
	
	@Getter
	@Setter
	public static class AS03010SVO{
		private String ibDealNo;				// IBDEAL번호
		private String riskInspctCcd;			// 리스크심사구분코드
		private String lstCCaseCcd;				// 부수안건구분코드
		private String inspctProgrsStCd;		// 진행상태
		private String ownPEno;					// 심사역
		private String fstRgstDt;				// 접수배정일
		private String inspctCnfrncCcd;			// 전결협의체
		
	}
	
	@Getter
	@Setter
	public static class AS04010SVO{
		private String ibDealNo;				// IBDEAL번호
		private String inspctDprtCcd;			// 심사부서구분코드
		private String dprtCd;					// 부점코드
		
		private String ibDealNm;				// IBDEAL명
		private String riskInspctCcd;			// 리스크심사구분코드
		private String riskInspctCcdNm;			// 리스크심사구분코드명
		private String lstCCaseCcd;				// 부수안건구분코드
		private String lstCCaseCcdNm;			// 부수안건구분코드명
		private String rqsDocNo;				// 요청문서번호
		private String linkUrl;					// 링크URL
		private String inspctPrgrsStCd;			// 심사진행상태코드
		private String inspctPrgrsStCdNm;		// 심사진행상태코드명
		private String invstCrncyCd;			// 투자통화코드
		private String invstCrncyCdNm;			// 투자통화코드명
		private String crncyAmt;				// 통화금액
		private String ptcpAmt;					// 참여금액
		private String riskInspctRsltnCcd;		// 리스크심사결의구분코드
		private String rsltnCnfrncCcd;			// 결의협의회구분코드
		private String fstCnfrncF;				// 최초협의여부
		private String rprStrtDt;				// 보고시작일자
		private String ofclDocAcptDt;			// 공문접수일자
		private String aplcExptDt;				// 적용예정일자
		private String inspctCnfrncCnclRsnCd;	// 심사협의취소사유코드
		private String cnclRsnCntnt;			// 취소사유내용
		private String RsltnDt;					// 결의일자
		private String inspctCnfrncCcd;			// 심사협의구분코드
		private String inspctCnfrncSqcSq;		// 심사협의회차일렬번호
		private String rnkNo;					// 순위번호
		private String rsltnRsltCd;				// 결의결과코드
		private String rcgAmt;					// 승인금액
		private String sdnCndtF;				// 셀다운조건여부
		private String etcCndtF;				// 기타조건여부
		private String rgstF;					// 등록여부
		private String rsltCntnt;				// 결과내용
		
		private String hndlDprtCd;				// 처리부점코드
		private String hndlPEno;				// 처리자사번
	}
	
	@Getter
	@Setter
	public static class AS03210SVO extends RAA02BDTO{
		private String riskInspctCcdNm;			// 리스크심사구분코드명
		private String lstCCaseCcdNm;			// 부수안건코드명
		private String inspctPrgrsStCdNm;		// 진행상태코드명
		private String empNm;					// 사원명
	}
	
	@Getter
	@Setter
	public static class TB06010SVO extends RAA02BDTO {
		// raa22b
	    private String     inspctCnfrncCcd;               // 심사협의구분코드
	    private String     stdYr;                         // 기준년도
	    private int        inspctCnfrncSqcSq;             // 심사협의회차일련번호
	    private int        rnkNo;                         // 순위번호
	    private int        sq;                            // 일련번호
	    private String     rsltnDt;                       // 결의일자
	    private String     rsltnRsltCd;                   // 결의결과코드
	    private BigDecimal rcgAmt;                        // 승인금액
	    private String     sdnCndtF;                      // 셀다운조건여부
	    private String     etcCndtF;                      // 기타조건여부
	    private String     rsltCntnt;                     // 결과내용
	    private String     ibDealNo;                      // IBDEAL번호
	    private String     riskInspctCcd;                 // 리스크심사구분코드
	    private String     lstCCaseCcd;                   // 부수안건구분코드
	    private String     hndlDyTm;                      // 처리일시
	    private String     hndlDprtCd;                    // 처리부점코드
	    private String     hndlPEno;                      // 처리자사번
	    private Date       aprvRosDyIm;                   // 결재요청일시
	    private Date       aprvDyTm;                      // 결재일시
	    private String     aprvPEno;                      // 결재자사번
	    private String     aprvStCd;                      // 결재상태코드
	    private String     aprvRjctRsn;                   // 결재반려사유
	    private String     cnfrncNtmCndtlCntnt;           // 협의회조건부내용
	    // rac02b
        private int        dealSq;                        // DEAL일련번호
        private String     inspctPrgrsStCd;               // 진행상태코드
        private String     dealNm;                        // DEAL명
        private String     bookCd;                        // BOOK코드
        private String     invstGdsLdvdCd;                // 투자상품대분류코드
        private String     invstGdsMdvdCd;                // 투자상품중분류코드
        private String     invstGdsSdvdCd;                // 투자상품소분류코드
        private String     invstGdsDtlsDvdCd;             // 투자상품상세분류코드
        private String     coprtnTypCd;                   // 협업유형코드
        private String     invstNtnCd;                    // 투자국가코드
        private String     invstCityNm;                   // 투자도시명
        private String     dealCntnt;                     // DEAL내용
        private String     cntcCorpNo;                    // 시공사법인등록번호
        private String     crdtManlF;                     // 신용보감여부
        private BigDecimal ltv;                           // LTV
        private String     abrdLoclCorpAsctCd;            // 해외현지법인협회코드
        private String     etcCntnt;                      // 기타내용
        private String     corpNo;                        // 법인번호
        private String     entpHnglNm;                    // 업체한글명
        private String     optrRgstNo;                    // 사업자등록번호
        private String     indTyp;                        // 업종
        private String     linTyp;                        // 계열
        private String     crdtGrdCd;                     // 신용등급코드
        private String     entpScal;                      // 기업규모
        private String     goPublMktCd;                   // 주식상장시장코드
        private BigDecimal dealScal;                      // DEAL규모
        private BigDecimal ptctScal;                      // 참여규모
        private String     tlErnAmt;                      // 전체수익금액
        private BigDecimal prntYrErnAmt;                  // 당해수익금액
        private String     wrtErnAmt;                     // 기표수익금액
        private BigDecimal onGoinAmt;                     // 이자수익금액
        private String     invstCrncyCd;                  // 투자통화코드
        private BigDecimal invstCrncyAmt;                 // 투자통화금액
        private String     dealScalUdfeF;                 // DEAL규모미정여부
        private String     wrtDt;                         // 기표일자
        private String     mtrtDt;                        // 만기일자
        private String     ptctScalUdfeF;                 // 참여규모미정여부
        private String     chrgHdqtCd;                    // 담당본부코드
        private String     chrgDprtCd;                    // 담당부점코드
        private String     chrgPEno;                      // 담당자사번
        private String     pyntHdqtCd;                    // 결재본부코드
        private String     pyntDprtCd;                    // 결재부점코드
        private String     pyntPEno;                      // 결재자사번
        private String     dltF;                          // 삭제여부
        private int        fileAttSq;                     // 파일첨부일련번호
        private String     fstHndlPEno;                   // 최초등록자사번
        private Date       fstHndlDyTm;                   // 최초등록일자
        private String     lstHndlPEno;                   // 최종변경자사번
        private Date       lstHndlDyTm;                   // 최종변경일시
	}
	 
	@Getter
	@Setter
	public static class IBSpecInfo {

		private String inqDvsn;                 //	조회구분			
		private String start;					//	조회시작일자
		private String end;						//	조회종료일자
		private String ibDealNm;			    //	ibDeal명
		private String ibDealNo;				//	ibDeal관리번호	

		private String DealNo;				    //	ibDeal관리번호
		private String bsnsDvsn;				//	사업구분
		private String bsnsDtlsDvsn;			//	사업상세구분
		private String DealNm;	    		    //	ibDeal명 
		private String fndNm;	         		//	펀드명  
		private String dprtNm;			 		//	부서명
		private String chrgpNm;				    //	담당자명 
		private String prgrsStsNm;		   	    //	진행상태명
		private String prgrsRstRpr;	        	//	진행결과보고
	}
	
	
	@Getter
	@Setter
	public static class TB06020SVO extends TB06010SVO {
	}
	
	
	@Getter
	@Setter
	public static class TB06010SVO2 extends TB06010SVO {
		// IBIMS201B
	    private String         prdtCd;                                          // 상품코드
	    private String         sn;                                              // 일련번호
	    private String         lastYn;                                          // 최종여부
	    private String         prdtNm;                                          // 상품명
	    private String         prdtDsc;                                         // 상품설명
	    private String         rqsKndCd;                                        // 기업여신신청종류코드
	    private String         prgSttsCd;                                       // 기업여신진행상태코드
	    private String         cnncPrdtCd;                                      // 연결상품코드
	    private String         dealNo;                                          // 딜번호
	    private String         dealNm;                                          // 딜명
	    private String         mtrNo;                                           // 안건번호
	    private String         nmcpMtrDcd;                                      // 부수안건구분코드
	    private int            nmcpMtrSn;                                       // 부수안건일련번호
	    private String         lstCCaseDcd;                                     // 리스크심사구분코드
	    private String         mtrNm;                                           // 안건명
	    private String         locoIssMngmNo;                                   // loc발급관리번호
	    private String         invIdtrtSmitYn;                                  // 투자확약서제출여부
	    private String         trgYn;                                           // 트리거여부
	    private String         trgCndCtns;                                      // 트리거조건내용
	    private String         invIdtrtSmitDt;                                  // 투자확약서제출일자
	    private String         trOthrDscmNo;                                    // 거래상대방식별번호
	    private String         grupItgrCrdtGrdDcd;                              // 그룹통합신용등급구분코드
	    private String         dmsCrdtGrdDcd;                                   // 국내신용등급구분코드
	    private String         crdtInqDt;                                       // 신용조회일자
	    private String         lstYn;                                           // 상장여부
	    private String         stlnCpstDcd;                                     // 대주구성구분코드
	    private String         frsMngmBdcd;                                     // 최초관리부점코드
	    private String         mngmBdcd;                                        // 관리부점코드
	    private String         chrrEmpno;                                       // 담당자사원번호
	    private String         subChrrEmpno;                                    // 서브담당자사원번호
	    private String         prdtClsfCd;                                      // 기업여신상품분류코드
	    private String         prdtMdclCd;                                      // 기업여신상품중분류코드
	    private String         prdtLclsCd;                                      // 기업여신상품대분류코드
	    private String         ibPrdtClsfCd;                                    // ib상품분류코드
	    private String         ibPrdtIflwPathDcd;                               // ib상품유입경로구분코드
	    private String         ibPrdtPefDcd;                                    // ib상품pef구분코드
	    private String         actsCd;                                          // 계정과목코드
	    private String         dcrbAthDcd;                                      // 기업여신전결권한구분코드
	    private String         acctJobCd;                                       // 기업여신회계업무코드
	    private String         acctUnJobCd;                                     // 기업여신회계단위업무코드
	    private String         acctTrCd;                                        // 기업여신회계거래코드
	    private BigDecimal     apvlAmt;                                         // 기업여신승인금액
	    private BigDecimal     ctrtAmt;                                         // 기업여신계약금액
	    private BigDecimal     invAmt;                                          // 기업여신투자금액
	    private String         intrRcvnMthCd;                                   // 기업여신이자수취방법코드
	    private String         intrBnaoDcd;                                     // 기업여신이자선후취구분코드
	    private String         tfdLyAplyDcd;                                    // 기업여신초일말일적용구분코드
	    private String         intrSnnoPrcsDcd;                                 // 기업여신이자단수처리구분코드
	    private String         paiRdmpDcd;                                      // 기업여신원리금상환구분코드
	    private String         ortnPrdtClsfCd;                                  // 기업여신운용상품분류코드
	    private String         intrtExpDcd;                                     // 기업여신금리만기구분코드
	    private BigDecimal     intrtRestFrqcMnum;                               // 금리재설정주기개월수
	    private BigDecimal     prnaRdmpFrqcMnum;                                // 원금상환주기개월수
	    private BigDecimal     intrRdmpFrqcMnum;                                // 이자상환주기개월수
	    private BigDecimal     prnaDfrPrdMnum;                                  // 원금거치기간개월수
	    private String         ctrtNo;                                          // 기업여신계약번호
	    private String         ctrcPrarDt;                                      // 약정예정일자
	    private BigDecimal     ctrcPrdMnum;                                     // 약정기간개월수
	    private String         ctrcPrdDcd;                                      // 약정기간구분코드
	    private String         sglLoanYn;                                       // 단독대출여부
	    private String         rgstCbndYn;                                      // 등록사채여부
	    private String         apvlDt;                                          // 승인일자
	    private String         expDt;                                           // 만기일자
	    private String         edDt;                                            // 종결일자
	    private String         stupDt;                                          // 설정일자
	    private String         trustEdDt;                                       // 신탁종료일자
	    private String         isuDt;                                           // 발행일자
	    private String         ctrtEndRsnCd;                                    // 기업여신계약종료사유코드
	    private String         ctrtEndRsnCtns;                                  // 기업여신계약종료사유내용
	    private String         trCrryCd;                                        // 거래통화코드
	    private String         invNtnCd;                                        // 투자국가코드
	    private String         ortnFndCd;                                       // 기업여신운용펀드코드
	    private String         dskCd;                                           // 기업여신데스크코드
	    private String         indvLmtDcd;                                      // 기업여신개별한도구분코드
	    private String         ctlbCtrtShpDcd;                                  // 우발채무계약형태구분코드
	    private String         ctlbBssAsstDcd;                                  // 우발채무기초자산구분코드
	    private String         socYn;                                           // soc여부
	    private String         socDcd;                                          // soc구분코드
	    private String         mrtgStupYn;                                      // 담보설정여부
	    private String         altnInvYn;                                       // 대체투자여부
	    private String         crdtRifcAplyYn;                                  // 신용보강적용여부
	    private String         frxcHdgeYn;                                      // 외환헷지여부
	    private String         sppiSfcYn;                                       // sppi충족여부
	    private String         projFnnYn;                                       // 프로젝트금융여부
	    private String         pplcFndYn;                                       // 사모펀드여부
	    private String         untpFndYn;                                       // 단위형펀드여부
	    private String         pfLoanYn;                                        // pf대출여부
	    private String         undwFnnYn;                                       // 인수금융여부
	    private String         trchAplyYn;                                      // 트렌치적용여부
	    private String         rlesFnnYn;                                       // 부동산금융여부
	    private String         sdnCndtYn;                                       // 셀다운승인조건여부
	    private String         etcCndtYn;                                       // 기타승인조건여부
	    private String         rlesFnnDetlDcd;                                  // 부동산금융상세구분코드
	    private String         holdPrpsDcd;                                     // 보유목적구분코드
	    private String         thcoRlDcd;                                       // 당사역할구분코드
	    private String         offrSrvcDcd;                                     // 제공서비스구분코드
	    private BigDecimal     ncrRt;                                           // ncr율
	    private BigDecimal     rwaRt;                                           // rwa율
	    private String         rpchPsblDt;                                      // 환매가능일자
	    private String         dispYn;                                          // 매각여부
	    private String         pplcCbndMpngYnDcd;                               // 사모사채매핑여부구분코드
	    private String         etcDetSctyDcd;                                   // 기타채무증권구분코드
	    private String         invJdgmComtNo;                                   // 투자심사위원회번호
	    private String         dispDtDcd;                                       // 매각일자구분코드
	    private BigDecimal     dispTlmtMnum;                                    // 매각기한개월수
	    private String         dispStdrAmtDcd;                                  // 매각기준금액구분코드
	    private BigDecimal     dispRto;                                         // 기업여신매각비율
	    private String         dispTlmtDt;                                      // 매각기한일자
	    private BigDecimal     dispAmt;                                         // 기업여신매각금액
	    private String         rdmpClmPsblDt;                                   // 상환청구가능일자
	    private String         aprnGoldStupTrgtYn;                              // 충당금설정대상여부
	    private String         bdbtRsvsRcknStdrLclsCd;                          // 대손준비금산정기준대분류코드
	    private String         bdbtRsvsRcknStdrMdclCd;                          // 대손준비금산정기준중분류코드
	    private String         bdbtRsvsRcknStdrSclsCd;                          // 대손준비금산정기준소분류코드
	    private BigDecimal     bdbtRsvsRcknStdrRto;                             // 대손준비금산정기준비율
	    private BigDecimal     thcoPtciAmt;                                     // 당사참여금액
	    private BigDecimal     prdtTotAmt;                                      // 상품총금액
	    private String         intrDnumClcMthCd;                                // 기업여신이자일수계산방법코드
	    private String         hldyPrcsDcd;                                     // 기업여신휴일처리구분코드
	    private String         stdrIntrtKndCd;                                  // 기업여신기준금리종류코드
	    private BigDecimal     fxnIntrt;                                        // 고정금리
	    private BigDecimal     addIntrt;                                        // 가산금리
	    private BigDecimal     intrtCngeFrqcMnum;                               // 금리변동주기개월수
	    private BigDecimal     hdwtEvlAmt;                                      // 수기평가금액
	    private String         weekMrtgKndCd;                                   // 기업여신주담보종류코드
	    private BigDecimal     ovduIntrRt;                                      // 연체이자율
	    private String         ovduIntrRtDcd;                                   // 기업여신연체이자율구분코드
	    private BigDecimal     totRdmpTmrd;                                     // 총상환회차
	    private BigDecimal     eqlRdmpAmt;                                      // 기업여신균등상환금액
	    private BigDecimal     istmDtmRdmpAmt;                                  // 할부일시상환금액
	    private BigDecimal     rcvbIntrAplyIrt;                                 // 미수이자적용이율
	    private BigDecimal     intrErnAmt;                                      // 기업여신이자수익금액
	    private BigDecimal     fndsPrcrCtAmt;                                   // 자금조달비용금액
	    private String         intrClcEndDeDcd;                                 // 기업여신이자계산종료일구분코드
	    private String         intrHdwtClcYn;                                   // 이자수기계산여부
	    private String         grdCd;                                           // 기업여신등급코드
	    private String         dshnRtGrdCd;                                     // 기업여신부도율등급코드
	    private String         rgstDt;                                          // 등록일자
	    private String         chngDt;                                          // 변경일자
	    private Date           hndDetlDtm;                                      // 조작상세일시
	    private String         hndEmpno;                                        // 조작사원번호
	    private String         hndTmnlNo;                                       // 조작단말기번호
	    private String         hndTrId;                                         // 조작거래id
	    private String         guid;                                            // guid
	    private String         earlyRepayYn;                                    // 중도상환여부
	    
	    private String         sumRcgAmt;                 	        		    // 딜승인금액합계
	    private String         eno;                 	        		    // 
	    private String         empNm;                 	        		    // 
	    private String         dprtNm;                 	        		    // 
	    private String         entpCd;                 	        		    // 
	    private String         bsnsRgstNo;                 	        		    // 
	    
	    private String 		   cnsbDcd;											// 협의체구분코드
	    private String         pageDcd;                 	        		    // 페이지구분코드
	   
	}	
}
