package com.nanuri.rams.com.dto;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.TB06015PVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalcDTO {
    
    private String 		paiRdmpDcd;              // 원금상환방법 == 원리금상환구분코드
	private String 		excDt;                   // 신규일자 == 실행일자
	private String 		expDt;                   // 만기일자
	private BigDecimal  dealExcAmt;              // 대출금액 == 딜실행금액
	private BigDecimal 	dealExcBlce;         	 // 대출잔액 == 딜실행잔액
	private String 		intrBnaoDcd;             // 이자선후취 == 이자선후취구분코드
	private BigDecimal 	eqlRdmpAmt;          	 // 균등상환금액 == 균등상환금액
	private String 		intrPymDtCd;             // 이자납입일 == 이자납입일자코드
	private int 		prnaRdmpFrqcMnum;        // 원금상환주기 == 원금상환주기개월수
	private int 		intrRdmpFrqcMnum;        // 이자상환주기(개월) == 이자상환주기개월수
	private BigDecimal 	rcvbIntrAmt;         	 // 미수이자금액 == 미수이자금액
	private String 		hldyPrcsDcd;             // 휴일처리구분 == 휴일처리구분코드
	private String		dfrExpDt;                // 거치만기일자
	private int 		dfrExpMnum;              // 거치만기개월수
	private String 		intrDnumClcMthCd;        // 이자일수계산방법 == 이자일수계산방법코드
	private String 		lastPrnaRdmpDt;          // 최종원금상환일자 == 최종원금상환일자
	private String 		tfdLyAplyDcd;            // 초일말일적용구분 == 초일말일적용구분코드
	private String 		intrSnnoPrcsDcd;         // 이자단수법구분 == 이자단수처리구분코드
	private String 		nxtIntrPymDt;            // 다음이자납입일자 == 다음이자납입일자
	private String 		intrClcEndDeDcd;         // 이자계산종료일구분 == 이자계산종료일구분코드
	private String 		ovduIntrRtDcd;           // 연체이자율구분 == 연체이자율구분코드
	private String 		lastIntrClcDt;           // 최종이자계산일자 == 최종이자계산일자
	private BigDecimal  trIntAmt;                // 거래이자
	
	private double 		stdrIntrt;               // 고정/기준금리
	private double 		addIntrt;                // 가산금리
	private double 		totIntrt;                // 총금리
	private String 		stdrDt;                  // 기준일자(예정일자)
	
	private int 		dfrCnt;		             // 거치기간총회차
	private int         baseCnt;                 // 이자납입기간총회차
	private int         seqFst;                  // 순서

    private String      strtDt;                  // 시작일자
    private String      endDt;                   // 종료일자
    private double      aplyIrt;                 // 적용이율
    private double      ovduIntrRt;              // 연체이자율
    
	private String 		prdtCd;                  // 상품코드
	private long 		excSn; 					 // 실행일련번호

	private List<IBIMS404BVO> intrtInfoList;					//금리정보 리스트
	private List<RdmpScheduleInfo> rdmpPlanList;				//원금상환 계획정보 리스트
	private List<IBIMS403BDTO> intrtPlanList; 					//이자상환 계획정보 리스트

	@Getter
	@Setter
	public class RdmpScheduleInfo{				//원금상환 계획 정보 

		private String 		   rdmpTmrd;		//원금상환 회차
		private String         strtDt;          // 시작일자
    	private String         endDt;           // 종료일자
		private BigDecimal     prarPrna;        // 예정원금 (상환원금)
		private String         prarDt;          // 상환예정일자

	} 

	@Getter
	@Setter
	public class intrScheduleInfo{				//이자상환 계획 정보

		private String         strtDt;          // 시작일자
    	private String         endDt;           // 종료일자
		private BigDecimal     aplyIrt;         // 적용이율

	}
}
