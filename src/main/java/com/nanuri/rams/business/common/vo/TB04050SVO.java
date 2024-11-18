package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
LOI/LOC 발급 화면 VO
*/
public class TB04050SVO {
	
	/* IBIMS501B */
    private String         dealNo;               				   // 딜번호
    private String         sq;                   				   // 일련번호
    private String         corpRgstNo;           				   // 법인등록번호
    private String         busiNm;               				   // 사업명
    private String         fndNm;                				   // 펀드명
    private String         invFnnMngmBusiDcd;    				   // 투자금융관리사업구분코드
    private String         invFnnMngnBusiDtlDcd; 				   // 투자금융관리사업세부구분코드
    private String         invFnnPfBusiDcd;      				   // 투자금융PF사업구분코드
    private String         invFnnMmngPrgSttsCd;  				   // 투자금융관리진행상태코드
    private String         busiMngmDptTpDcd;     				   // 사업관리부서유형구분코드
    private String         invFnnBusiWyDcd;      				   // 투자금융사업방식구분코드
    private String         invFnnFixdFlctDcd;    				   // 투자금융고정변동구분코드
    private String         invFnnTrgtDcd;        				   // 투자금융대상자구분코드
    private String         hbrdRlesDcd;          				   // 국내외부동산구분코드
    private String         invFnnBusiAreaDcd;    				   // 특수금융사업지역코드
    private String         invFnnInvTyDcd;       				   // 투자금융투자유형코드
    private String         invFnnInvStrucDcd;    				   // 투자금융투자구조코드
    private String         invFnnInvWyDcd;       				   // 투자금융투자방식코드
    private String         invAsstAreaLclsCd;    				   // 투자자산지역대분류코드
    private String         invAsstAreaMdclCd;    				   // 투자자산지역중분류코드
    private String         invAsstAreaSclsCd;    				   // 투자자산지역소분류코드
    private String         invAsstExpsrDcd;      				   // 투자자산익스포져구분코드
    private String         invFnnOprtTyDcd;      				   // 투자금융운영형태구분코드
    private String         invFnnAsstClsfCd;     				   // 투자금융자산분류코드
    private String         ivtgShdnRsnCnts;      				   // 검토중단사유내용
    private String         crncyCd;              				   // 통화코드
    private BigDecimal     totPrcrAmt;           				   // 총조달금액
    private String         mainBondMtncCnts;     				   // 주요채권보전내용
    private String         thcoMdtnYn;           				   // 당사주선여부
    private BigDecimal     thcoMdtnAmt;          				   // 당사주선금액
    private BigDecimal     thcoPtcpAmt;          				   // 당사참여금액
    private String         aplyIntrtCnts;        				   // 적용금리내용
    private BigDecimal     goalErnRt;            				   // 목표수익율
    private BigDecimal     feeRt;                				   // 수수료율
    private String         csrInvYn;             				   // 사회책임기업투자여부
    private String         blindYn;              				   // 블라인드여부
    private String         lqdzYn;               				   // 유통화여부
    private String         loanMdtnIsttNm;       				   // 대출주선기관명
    private String         setInvSaupNm;         				   // 집합투자사업자명
    private String         chrrEmpno;            				   // 담당자사원번호
    private String         chrrEmpnm;            				   // 담당자사원명
    private String         subiStarDt;           				   // 사업시작일자
    private String         subiEndDt;            				   // 사업종료일자
    private String         rmEmpno;              				   // RM사원번호
    private String         rmEmpnm;              				   // RM사원명
    private String         busiCnts;             				   // 사업내용
    private String         rgstDt;               				   // 등록일자
    private String         ctrcDt;               				   // 약정일자
    private String         expDt;                				   // 만기일자
    private BigDecimal     invStgyDecdSn;        				   // 투자전략결재일련번호
    private BigDecimal     bfhIvtgDecdSn;        				   // 사전검토결재일련번호
    private BigDecimal     jdgmDecdSn;           				   // 심사결재일련번호
    private String         ivtgPtfdCnts;         				   // 검토부의내용
    private String         ivtgRsltCtns;         				   // 검토결과내용
    private String         bfhIvtgCnts;          				   // 사전검토내용
    private String         ivtgRsltRsltCtns;     				   // 사전검토결과내용
    private String         jdgmOfrCnts;          				   // 심사의뢰내용
    private String         jdgmAcptCnts;         				   // 심사접수내용
    private String         jdgmRsltCnts;         				   // 심사결과내용
    private String         bzno;                 				   // 사업자등록번호
    private String         brwrNm;               				   // 차주명
    private String         mgcoNm;               				   // 운용사명
    private String         apvlDcmNoNm;          				   // 승인문서번호명
    private String         alotFrqcNm;           				   // 배당주기내용
    private BigDecimal     syndLoanBlce;         				   // 신디케이트론잔액
    private BigDecimal     ltv;                  				   // LTV
    private BigDecimal     valtMrtgRto;          				   // 유효담보비율
    private String         rpsDelNo;             				   // 대표딜번호
    private String         delYn;                				   // 삭제여부
    private Date           hndDetlDtm;           				   // 조작상세일시
    private String         hndEmpno;             				   // 조작사원번호
    private String         hndTmnlNo;            				   // 조작단말기번호
    private String         hndTrId;              				   // 조작거래id
    private String         guid;                 				   // guid
	
    /* IBIMS224B */
    private String         issMngmNo;                              // 발급관리번호
    private String         issSttsCd;                              // 발급상태코드
    private String         empno;                                  // 사원번호
    private String         decdDptDcd;                             // 부서명
    private String         prdtCd;                                 // 상품코드
    private String         ibPrdtClsfCd;                           // ib상품분류코드
    private String         issBdcd;                                // 발급부점코드
    private String         issCrryCd;                              // 발급통화코드
    private String         loiLocYn;                               // LOI/LOC여부
    private BigDecimal     stdrExrt;                               // 기준환율
    private String         issLtrDcd;                              // 발급서류구분코드
    private String         issTrOthrDscmNo;                        // 발급거래상대방식별번호
    private String         issDt;                                  // 발급일자
    private String         trOthrNm;                               // 거래상대방명
    private String         valtDt;                                 // 유효일자
    private String         rclmDt;                                 // 회수일자
    private BigDecimal     issAmt;                                 // 발급금액
    private String         issCtns;                                // 발급내용
    private String         issPclrCtns;                            // 발급특이내용
    private String         ivtgRqstCtns;                           // 발급요청내용
    private String         rclmRsnCtns;                            // 회수사유내용
    private String         rclmRsnDcd;                             // 회수사유구분코드
    private BigDecimal     rclmAmt;                                // 회수금액
    private BigDecimal     rclmSmmAmt;                             // 회수합계금액
    private String         ivtgCnfmYn;                             // 검토확인여부
    private String         smitOrgi;                               // 제출처
    private String         hanfDcmNo;                              // 하나포털문서번호
    private String         prgSttsCd;                              // 진행상태코드
    private String         sq1ApvlYn;                              // 1차승인여부
    private String         sq2ApvlYn;                              // 2차승인여부
    
	private String 		   decdDptNm;							   // 부서명
	private String 		   dealNm;								   // 딜명
	private String 		   empNm;								   // 담당자명
	private String 		   issLtrNm;							   // 발급서류구분코드명
	private String 		   strtDt;								   // 시작일자
	private String 		   endDt;								   // 종료일자
}
