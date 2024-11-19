package com.nanuri.rams.tb.tb04;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb04.tb04060.TB04060ServiceImpl;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;

@SpringBootTest
public class TB04060STest {

    @Autowired
    private TB04060ServiceImpl tb04060ServiceImpl;

    @Test
    void checkDealSearchTest1 () {

        IBIMS201BVO param = new IBIMS201BVO();

        /* 파라미터 세팅 */
        //  dealNo
        //  prdtCd
        //  prdtLclsCd
        //  prdtMdclCd
        //  prdtClsfCd
        //  ibPrdtClsfCd
        //  cnsbDcd
        //  prgSttsCd
        //  chrrEmpno
        //  trOthrDscmNo
        //  rgstDt
        //  rgstEndDt
        //  apvlDt
        //  apvlEndDt
        /* 파라미터 세팅 */

        tb04060ServiceImpl.checkDealSearch(param);

    }
    
}
