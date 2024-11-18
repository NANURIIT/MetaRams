package com.nanuri.rams.business.common.dto;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS204BDTO {

    private String prdtCd;               /* 상품코드 */
    private int feeSn;                   /* 수수료일련번호 */
    private int aplyMnum;                /* 적용개월수 */
    private double mdwyRdmpFeeRto;       /* 중도상환수수료비율 */
    private String hndDetlDtm;           /* 조작상세일시 */
    private String hndEmpno;             /* 조작사원번호 */
    private String hndTmnlNo;            /* 조작단말기번호 */
    private String hndTrId;              /* 조작거래id */
    private String guid;                 /* guid */
    private String queryType;           
    
}
