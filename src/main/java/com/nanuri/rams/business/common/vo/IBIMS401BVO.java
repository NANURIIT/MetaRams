package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IBIMS401BVO extends IBIMS401BDTO {
    private String srchF;    // 조회구분

    private long trSn;       // 거래일련번호
	private long excSn;      // 실행일련번호
    private long rgstSn;     // 등록일련번호
    
    private String ptxtTrOthrDscmNm;
    private String eprzCrdlPrdtClsfNm;
    private String apvlDt;
    private String apvlAmt;
    private String ctrcAmt;
    private String paiRdmpDcd;
    private String intrBnaoDcd;
    private String prgSttsCd;
    private String mngmBdcdNm;
    private String chrrEmpnm;
    private BigDecimal dealExcBlce;
    private BigDecimal loanAmt;
    private String rqsKndCd;               // 기업여신신청종류코드
    private String eprzCrdlOrtnFndNm;      // 펀드명
    private String dealTrPrca;             // 딜거래원금
    private String dealExcAmt;             // 대출금액

    private String cnncPrdtCd;             // 연결상품코드
    private String dealNo;                 // 딜번호
    private String dealNm;                 // 딜명
    private String mtrNo;                  // 안건번호
    private String nmcpMtrDcd;             // 부수안건구분코드
    private int    nmcpMtrSn;              // 부수안건일련번호
    private String lstCCaseDcd;            // 리스크심사구분코드
    private String mtrNm;                  // 안건명
    
    private List<IBIMS402BVO> excInfo;
    private List<IBIMS348BVO> excFee;

    private List<IBIMS410BVO>  trDtls;       // 딜거래내역
    private List<IBIMS406BVO>  intrTrDtls;   // 이자계산내역
    private List<IBIMS420BVO>  feeRcivDtls;  // 수수료수납내역

}
