package com.nanuri.rams.business.common.vo;
import com.nanuri.rams.business.common.dto.IBIMS200BDTO;

//import java.math.BigDecimal;
//import java.util.List;
//
//import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
//import com.nanuri.rams.com.dto.CalculationSumDTO;
//import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
//
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class TB06070SVO{

//	private String PRDT_CD; 							// 상품코드
//	private String ASST_CLSF_CD; 						// 자산분류코드
//	private String ASST_LCLS_CD; 						// 자산대분류코드
//	private String PRDT_TYPE_CD; 						// 상품유형코드
//	private String CRDT_GRNT_MCLS_CD; 					// 신용공여중분류코드
//	private String CRDT_GRNT_TYPE_CD; 					// 신용공여유형코드
//	private String SPPI_YN; 							// SPPI여부
//	private String UTLZ_FUND_FNNC_PRDT_CLSF_CD; 		// 운용펀드금융상품분류코드
//	private String LOAN_EXPD_CD; 						// 대출만기코드
//	private String PRCT_LOAN_YN; 						// 프로젝트대출여부
//	private String UDWT_FNNC_YN; 						// 인수금융여부
//	private String RLES_RELT_YN; 						// 부동산관련여부
//	private String CRDT_GRNT_ACTS_CD; 					// 신용공여계정과목코드
//	private String PRDT_SALE_STAT_CD; 					// 상품판매상태코드
//	private String PRDT_NAME; 							// 상품명
//	private String SALE_STRT_DT; 						// 판매시작일자
//	private String SALE_END_DT; 						// 판매종료일자
//	private String INT_ANAP_DVSN_CD; 					// 이자선후급구분코드
//	private String MRDP_FEE_YN; 						// 중도상환수수료여부
//	private String FRCR_LOAN_YN; 						// 외화대출여부
	
//	private String prdtCd;		                // 상품코드
//	private String asstClsfCd;		            // 자산분류코드
//	private String asstLclsCd;		            // 자산대분류코드
//	private String prdtTypeCd;		            // 상품유형코드
//	private String crdtGrntMclsCd;		        // 신용공여중분류코드
//	private String crdtGrntTypeCd;		        // 신용공여유형코드
//	private String sppiYn;		                // SPPI여부
//	private String utlzFundFnncPrdtClsfCd;		// 운용펀드금융상품분류코드
//	private String loanExpdCd;		            // 대출만기코드
//	private String prctLoanYn;		            // 프로젝트대출여부
//	private String udwtFnncYn;		            // 인수금융여부
//	private String rlesReltYn;		            // 부동산관련여부
//	private String crdtGrntActsCd;		        // 신용공여계정과목코드
//	private String prdtSaleStatCd;		        // 상품판매상태코드
//	private String prdtName;	                // 상품명
//	private String saleStrtDt;		            // 판매시작일자
//	private String saleEndDt;		            // 판매종료일자
//	private String intAnapDvsnCd;		        // 이자선후급구분코드
//	private String mrdpFeeYn;		            // 중도상환수수료여부
//	private String frcrLoanYn;		            // 외화대출여부
	
	private String prdtCd;                      /* 상품코드 */
	private String asstClsfCd;                  /* 자산분류코드 */
	private String asstLclsCd;                  /* 자산대분류코드 */
	private String asstMclsCd;                  /* 자산중분류코드 */
	private String asstClsfDtlCd;               /* 자산분류상세코드 */
	private String prdtTypeCd;                  /* 상품유형코드 */
	private String crdtGrntMclsCd;              /* 신용공여중분류코드 */
	private String crdtGrntTypeCd;              /* 신용공여유형코드 */
	private String utlzFundCd;                  /* 운용펀드코드 */
	private String sppiYn;                      /* SPPI여부 */
	private String utlzFundFnncPrdtClsfCd;      /* 운용펀드금융상품분류코드 */
	private String loanExpdCd;                  /* 대출만기코드 */
	private String fnncGrteCtrtAsstYn;          /* 금융보증계약자산여부 */
	private String prctLoanYn;                  /* 프로젝트대출여부 */
	private String udwtFnncYn;                  /* 인수금융여부 */
	private String frcrLoanYn;                  /* 외화대출여부 */
	private String eclsLoanYn;                  /* 제외대출여부 */
	private String pchsLoanOblgYn;              /* 매입대출채권여부 */
	private String rlesReltYn;                  /* 부동산관련여부 */
	private String pplcDbtrYn;                  /* 사모사채여부 */
	private String itpsYn;                      /* 이해관계인여부 */
	private String noprAtvtDvsnCd;              /* 영업외활동구분코드 */
	private String afltDvsnCd;                  /* 계열사구분코드 */
	private String ipmtOblgYn;                  /* 손상채권여부 */
	private String fincCvsnOblgYn;              /* 출자전환채권여부 */
	private String pxdfYn;                      /* 대지급여부 */
	private String crdtGrntActsCd;              /* 신용공여계정과목코드 */
	private String pflsActsCd;                  /* 손익계정과목코드 */
	private String rcvbAsstActsCd;              /* 미수자산계정과목코드 */
	private String prdtSaleStatCd;              /* 상품판매상태코드 */
	private String rqstVrfcObjtYn;              /* 신청검증대상여부 */
	private String prdtName;                    /* 상품명 */
	private String prdtEngName;                 /* 상품영문명 */
	private String prdtAbrvName;                /* 상품의 약어명(약칭) 을 관리함 */
	private String prdtEngAbrvName;             /*   */
	private String frstErlmDt;                  /* 최초등록일자 */
	private String saleStrtDt;                  /* 판매시작일자 */
	private String saleEndDt;                   /* 판매종료일자 */
	private String bitrKindCd;                  /* 기준금리종류코드 */
	private String lmtBassCd;                   /* 한도기준코드 */
	private String apvlUnitAmt;                 /* 승인단위금액	 */
	private String minApvlAmt;                  /* 최소승인금액	 */
	private String maxApvlAmt;                  /* 최대승인금액	 */
	private String shstCrdlTermMcnt;            /* 최단여신기간개월수 */
	private String lgstCrdlTermMcnt;            /* 최장여신기간개월수 */
	private String shstDfmtTermMcnt;            /* 최단거치기간개월수 */
	private String lgstDfmtTermMcnt;            /* 최장거치기간개월수 */
	private String intAnapDvsnCd;               /* 이자선후급구분코드 */
	private String nrmlIntCalcTypeCd;           /* 정상이자계산유형코드 */
	private String ovduIntCalcTypeCd;           /* 연체이자계산유형코드 */
	private String rcvbIntCalcTypeCd;           /* 미수이자계산유형코드 */
	private String mrdpFeeYn;                   /* 중도상환수수료여부 */
	private String kcisOffrYn;                  /* 한국신용정보원제공여부 */
	private String execActgAfrsCd;              /* 실행회계업무코드 */
	private String rdptActgAfrsCd;              /* 상환회계업무코드 */
	private String execActgUnitAfrsCd;          /* 실행회계단위업무코드 */
	private String execActgTrCd;                /* 실행회계거래코드 */
	private String rdptActgUnitAfrsCd;          /* 상환회계단위업무코드 */
	private String rdptActgTrCd;                /* 상환회계거래코드 */
	private String dfntYn;                      /* 확정여부 */
	private String dsusYn;                      /* 폐기여부 */
	private String prdtDscr;                    /* 상품설명 */
	private String delYn;                       /* 삭제여부 */
	private String hndDetlDtm;                  /* 조작상세 */
	private String hndEmpno;                    /* 조작사원번호 */
	private String hndTmnlNo;                   /* 조작단말기번호 */
	private String hndTrId;                     /* 조작거래id */
	private String guid;                        /* guid */
}
