package com.nanuri.rams.com.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class CalculationSumDTO {
    private BigDecimal     totalIntr;                   //정상이자합계
    private BigDecimal     totalPrna;                   //예정원금합계
    private BigDecimal 	   totlaMrdpPrca;			    //중도상환 원금합계   
    private BigDecimal     totalMdwyRdmpFee;            //중도상환 수수료 합계
    private BigDecimal     totalPrnaOvduIntr;           //원금연체이자 합계
    private BigDecimal     totalIntrOvduIntr;           //이자연체이자 합계
    private BigDecimal     totalOvduIntr;               //총 연체이자 합계
    private BigDecimal     totalTrgtAmt;                //총 수납대상금액 합계

    private String         nextPrarPrnaDt;              //다음원금상환일
    private String         nextPrarIntrDt;              //다음이자납입일
    private String         lastPrarIntrDt;              //최종원금상환일
    
}
