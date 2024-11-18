package com.nanuri.rams.business.assessment.tb06.tb06015;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class LoanData {

	private int seq;							// 회차
	private String paiRdmpDcd; 					// 원금상환방법
	private BigDecimal loanBalance;				// 대출원금
	private BigDecimal monthlyPayment;			// 납입원금
	private BigDecimal monthlyInterest;			// 이자
	private BigDecimal monthlyBalancPayTotal;	// 월상환금
	private BigDecimal monthlyPaymentTotal;		// 납입원금누계
	private BigDecimal monthlyBalance;			// 대출잔금
	private BigDecimal interestTotal;			// 이자합계
	private BigDecimal loanBalanceTotal;		// 대출원금합계
	private double ddCnt; 						// 일수 
	private String ddCntContent;				// 일수 배열정보
	private double aplyIntrt;     				// 적용이율 
	private String aplyIntrtContent;    		// 적용금리 배열정보
	private String strtDt; 						// 시작일지
	private String endDt; 						// 종료일자 
	private String sectionType;					// 회차를 구분하는 타입
	private String dfrType;						// 거치기간 회차를 구분하는 코드
	
}
