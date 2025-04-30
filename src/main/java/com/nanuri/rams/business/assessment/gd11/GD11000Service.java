package com.nanuri.rams.business.assessment.gd11;
import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.dto.IBIMS002BDTO;
import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.GD11000SVO;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;


@Service
public interface GD11000Service {

    // 조회하려는 코드구분 
    public List<IBIMS001BVO> getCommonCodeName();

    // /**
    //  * 그룹코드정보 리스트 
    //  * @paramData cmnsCdGrp
    //  * @return
    //  */
    // public List<IBIMS001BDTO> getGrpCdInfo(IBIMS001BDTO paramData);

    // /**
    //  * 추가코드정보 리스트
    //  * @paramData " "
    //  * @return 
    //  */
    // public List<IBIMS002BVO> getAddCdInfo(IBIMS001BDTO paramData);

    // 통합코드정보 리스트
    public GD11000SVO getCodeInfo(IBIMS001BDTO paramData);

    // 저장
    public int saveCodeInfo(GD11000SVO param);
    // 돌려야될 로직이 없다?! >> 임플에 작성해야지..
}
