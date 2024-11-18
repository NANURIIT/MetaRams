package com.nanuri.rams.business.common.vo;
import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
import com.nanuri.rams.com.dto.CalculationSumDTO;
import com.nanuri.rams.business.common.dto.IBIMS403BDTO;

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
public class TB06015SVO {
    private String paiRdmpDcd; 		            // 원금상환방법 == 원리금상환구분코드
	private String excDt; 			            // 신규일자 == 실행일자
	private BigDecimal dealExcBlce;             // 대출잔액 == 딜실행잔액
	private BigDecimal  dealExcAmt;         	// 대출금액 == 딜실행금액
	private String intrBnaoDcd; 	            // 이자선후취 == 이자선후취구분코드
	private String mtrtDt; 			            // 만기일자 == 만기일자
	private BigDecimal eqlRdmpAmt; 	            // 균등상환금액 == 균등상환금액
	private String intrPymDtCd; 	            // 이자납입일 == 이자납입일자코드
	private int intrRdmpFrqcMnum; 	            // 이자상환주기(개월) == 이자상환주기개월수
	private BigDecimal rcvbIntrAmt;             // 미수이자금액 == 미수이자금액
	private String hldyPrcsDcd; 	            // 휴일처리구분 == 휴일처리구분코드
	private int prnaRdmpFrqcMnum;      	   		// 원금상환주기 == 원금상환주기개월수
	private String dfrExpDt; 		            // 거치만기일자 == 거치만기일자
	private int 		dfrExpMnum;             // 거치만기개월수
	private String intrDnumClcMthCd;            // 이자일수계산방법 == 이자일수계산방법코드
	private String lastPrnaRdmpDt; 	            // 최종원금상환일자 == 최종원금상환일자
	private String tfdLyAplyDcd; 	            // 초일말일적용구분 == 초일말일적용구분코드
	private String intrSnnoPrcsDcd;             // 이자단수법구분 == 이자단수처리구분코드
	private String nxtIntrPymDt; 	            // 다음이자납입일자 == 다음이자납입일자
	private String intrClcEndDeDcd;             // 이자계산종료일구분 == 이자계산종료일구분코드
	private String ovduIntrRtDcd; 	            // 연체이자율구분 == 연체이자율구분코드
	private String lastIntrClcDt; 	            // 최종이자계산일자 == 최종이자계산일자
	
	private double fxnIntrt;                    // 고정/기준금리
	private double addIntrt;                    // 가산금리
	private String stdrDt;                      // 기준일자(예정일자)

	private int dfrCnt;		                    // 거치기간총회차
	private int baseCnt;                        // 이자납입기간총회차
	
	private String prdtCd;                      //상품코드
	private long excSn;							//실행순번 == 실행일련번호

	private List<TB06015PVO.PrnRdmpInfoVO> prnRdmpInfoList;		//원금상환계획정보 리스트
	private List<IBIMS404BVO> intrtInfoList;					//금리정보 리스트
	private List<IBIMS403BDTO> rdmpPlanList;					//원금상환 계획정보 리스트
	private List<IBIMS403BDTO> intrtPlanList; 					//이자상환 계획정보 리스트
	private List<IBIMS404BDTO> intrtList;

	private int seq;							// 회차
	private BigDecimal monthlyPayment;			// 납입원금
	private BigDecimal monthlyInterest;			// 이자
	private BigDecimal monthlyBalancPayTotal;	// 월상환금
	private BigDecimal monthlyPaymentTotal;		// 납입원금누계
	private BigDecimal monthlyBalance;			// 대출잔금
	private BigDecimal interestTotal;			// 이자합계
	private BigDecimal loanBalanceTotal;		// 대출원금합계
	private long ddCnt; 						// 일수 == 일수
	private String ddCntContent;				// 일수 배열정보
	private String strtDt;                      // 시작일지 == 시작일자
	private String endDt;                       // 종료일자 == 종료일자 
	private String sectionType;					// 회차를 구분하는 타입
	private String dfrType;						// 거치기간 회차를 구분하는 코드

	private String         prcsCpltYn;                             // 처리완료여부
	

	private double baseRate; 					// 고정/기준금리+가산금리
	private double loanYear;        			// 기간(년) 기준일자(예정일자) 기준
	private double loanYear2; 					// 기간(년) 만기일자 기준
	private double monthlyLoanCnt;  			// 기간(월) 기준일자(예정일자) 기준
	private double monthlyLoanCnt2; 			// 기간(월) 만기일자 기준
	private BigDecimal loanBalance; 			// 대출원금
	private double aplyIntrt;     				// 월이율 (3/100)
	private String aplyIntrtContent;    		// 적용금리 배열정보

	private long           rgstSn;                                 // 등록일련번호
    private String         aplyStrtDt;                             // 적용시작일자
    private String         aplyEndDt;                              // 적용종료일자
    private String         stdrIntrtKndCd;                         // 기준금리종류코드
    private String     	   intrtCngeFrqcCd;                        // 금리변동주기코드
    private int            intrtCngeFrqcMnum;                      // 금리변동주기개월수
    private String         aplyDnumDcd;                            // 적용일수구분코드
    private int            stdrIntrtAplyDnum;                      // 기준금리적용일수

	private String stdrIntrtKndCdNm;			//기준금리종류코드명
	private String aplyDnumDcdNm;				//적용일수구분코드명
	private String intrtCngeFrqcCdNm;			//금리변동주기코드명

	private double ovduIntrRt;					//연체이자율
	private String prnaOvduDt; 					//원금연체일자 
	private String intrOvduDt; 			 		//이자연체일자 
	private String tlmtPrfLoseDt;               //기한이익상실일자


	private String mrdpYn; 						//중도상환여부 
	private BigDecimal dealMrdpPrca;			//중도상환원금
	private double mdwyRdmpFeeRto;				//중도상환 수수료율
	private String prcsDt;					 	//처리일자

	private List<TB06015OVO> scdhList;			//상환스케줄 리스트
	private CalculationSumDTO totalDTO;			//계산결과 합계

}
