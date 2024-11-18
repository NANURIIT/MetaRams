package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
/*
 * 협의체 의견등록화면 VO
 */
public class TB05020SVO {
    private String         cnsbDcd;
    private String         cnsbDcdNm;
    private String         rsltnYr;
    private String         cnsbSq;
    private String         sn;
    private String         dealNo;
    private String         mtrDcd;
    private String         jdgmDcd;
    private String         mtrNm;
    private String         cnsbOpnDt;
    private String         ptfdCrncyCd;
    private String         ptfdCrncyCdNm;
    private BigDecimal     ptfdAmt;
    private BigDecimal     apvlAmt;
    private String         mtrPrgSttsDcd;
    private String         mtrPrgSttsDcdNm;
    private String         aprvOppsDcd;
    private String         aprvOppsDcdNm;
    private String         opnnCtns;

}