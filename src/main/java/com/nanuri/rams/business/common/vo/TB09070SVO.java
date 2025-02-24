package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import java.util.List;
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
public class TB09070SVO {
    private String fromDt;          //조회시작일
    private String toDt;            //조회종료일
    private String mngmBdcd;        //관리부점코드
    private String actsCd;          //계정과목코드
    private String dealNo;          //딜번호
    private String prdtCd;          //종목코드
    private String trObjtBsnNo;     //거래상대방 기업체번호

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Getter
    @Setter
    public static class RdmpTrgtDtlsVO{
        private BigDecimal  prarPrna;        //상환예정원금
        private BigDecimal  rdmpPrarIntr;    //상환예정이자
        private String      prarDt;          //상환예정일자
        private BigDecimal  pmntPrarAmt;     //납부예정금액
        private String      mngmBdcd;        //관리부점코드     
        private String      actsCd;          //계정과목코드
        private String      dealNo;          //딜번호
        private String      dealNm;          //딜명
        private String      prdtCd;
        private long        excSn;
        private String      trObjtBsnNo;     //거래상대방 기업체번호
        private String      prdtNm;          //상품명
        private String      ortnFndCd;       //운용펀드코드
        private String      fndNm;           //펀드명
        private String      trCrryCd;        //통화코드

        private BigDecimal  ovduIntr;        //연체이자
        private BigDecimal  rcvbIntr;        //미수이자
        private BigDecimal  totalFee;        //수수료총금액
    }
}
