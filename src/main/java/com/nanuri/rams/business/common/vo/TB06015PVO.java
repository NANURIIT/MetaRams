package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.dto.IBIMS404BDTO;

import lombok.NoArgsConstructor;

import lombok.Getter;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TB06015PVO  {
		
	private String paiRdmpDcd;              // 원금상환방법 == 원리금상환구분코드
	private String excDt;                   // 신규일자 == 실행일자
	private BigDecimal dealExcBlce;         // 대출잔액 == 딜실행잔액
	private BigDecimal  dealExcAmt;         // 대출금액 == 딜실행금액
	private String intrBnaoDcd;             // 이자선후취 == 이자선후취구분코드
	private String mtrtDt;                  // 만기일자 == 만기일자
	private BigDecimal eqlRdmpAmt;          // 균등상환금액 == 균등상환금액
	private String intrPymDtCd;             // 이자납입일 == 이자납입일자코드
	private int intrRdmpFrqcMnum;           // 이자상환주기(개월) == 이자상환주기개월수
	private BigDecimal rcvbIntrAmt;         // 미수이자금액 == 미수이자금액
	private String hldyPrcsDcd;             // 휴일처리구분 == 휴일처리구분코드
	private int prnaRdmpFrqcMnum;           // 원금상환주기 == 원금상환주기개월수
	private String dfrExpDt;                // 거치만기일자 == 거치만기일자
	private String intrDnumClcMthCd;        // 이자일수계산방법 == 이자일수계산방법코드
	private String lastPrnaRdmpDt;          // 최종원금상환일자 == 최종원금상환일자
	private String tfdLyAplyDcd;            // 초일말일적용구분 == 초일말일적용구분코드
	private String intrSnnoPrcsDcd;         // 이자단수법구분 == 이자단수처리구분코드
	private String nxtIntrPymDt;            // 다음이자납입일자 == 다음이자납입일자
	private String intrClcEndDeDcd;         // 이자계산종료일구분 == 이자계산종료일구분코드
	private String ovduIntrRtDcd;           // 연체이자율구분 == 연체이자율구분코드
	private String lastIntrClcDt;           // 최종이자계산일자 == 최종이자계산일자

	private int dfrExpMnum;					//거치만기개월수

	private double ovduIntrRt;              // 연체이자율
	
	private double fxnIntrt;                // 고정/기준금리
	private double addIntrt;                // 가산금리
	private String stdrDt;                  // 기준일자(예정일자)
	private String prcsCpltYn;              // 처리완료여부
	private String prcsDt;					//처리일자
	
	private String prdtCd;                  //상품코드

	private List<PrnRdmpInfoVO> prnRdmpInfoList;	//원금상환계획정보 리스트
	private List<IBIMS404BVO> intrtInfoList;		//금리정보 리스트
	private List<IBIMS403BDTO> rdmpPlanList;		//원금상환 계획정보 리스트
	private List<IBIMS403BDTO> intrtPlanList; 		//이자상환 계획정보 리스트

	private String mrdpYn; 						//중도상환여부 
	private BigDecimal dealMrdpPrca;			//중도상환원금
	private double mdwyRdmpFeeRto;				//중도상환 수수료율

	@Getter
    @Setter
    public static class PrnRdmpInfoVO {		//원금상환계획정보 (원금불균등상환)
        private int rdmpSeq;				//상환회차
		private String rdmpDueDt;			//상환예정일자
		private BigDecimal prnRdmpAmt;		//상환예정원금
    }

}
