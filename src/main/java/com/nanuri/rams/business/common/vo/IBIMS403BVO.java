package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.dto.IBIMS403HDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS403BVO extends IBIMS403BDTO {
	
    private String dealExcBlce;     	// 딜실행잔액
    private String expDt;     			// 만기일자
    private BigDecimal dealMrdpPrca;	// 딜중도상환원금
    private BigDecimal mrdpFeeAmt;		// 중도상환수수료금액
    private BigDecimal rcvbIntrAmt;		// 미수이자금액
    private BigDecimal exmptAmt;        // 면제금액 
	private String mrdpYn; 				// 중도상환여부
	private BigDecimal mdwyRdmpFeeRto;  // 중도상환수수료비율
	private int intrAplyDnum;           // 이자적용일수
	private String paiTypCd;			// 원리금유형코드
	private BigDecimal trgtAmt;         // 대상금액
	private BigDecimal pmntAmt;         // 납부금액
	private String bssTypCd;			// 원리금유형코드
	private String rkfrDt;              // 기산일자(상환일자)
    private long hgrkTrSn;              // 상위거래일련번호

	private BigDecimal pmntPrarAmt;		//납부예정금액
	private BigDecimal fee;				//수수료
	private long feeSn;					// 수수료일련번호
	private String rdmpTmrd;			// 상환회차
	private String dealNo;				//딜번호
	private String trCrryCd;			//통화코드
	private String mngmBdcd;			//관리부서코드
	
}
