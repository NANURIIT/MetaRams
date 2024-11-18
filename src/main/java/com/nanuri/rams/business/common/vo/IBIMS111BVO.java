package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS111BDTO;
import lombok.Getter;

@Getter
/*
 * 딜심사내부등급내역 table(IBIMS107BDTO) VO
 */
public class IBIMS111BVO extends IBIMS111BDTO {
    String cnsbDcdNm;        // 협의체구분코드명
    String jdgmRsltDcdNm;    // 심사결과구분코드명
    String mtrPrgSttsDcd;    // 안건진행상태구분코드
    String mtrPrgSttsDcdNm;  // 안건진행상태구분코드명

    String cnsbNm;
    String dealNo;
    String mtrDcd;
    String cdVlNm;
}