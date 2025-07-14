package com.nanuri.rams.business.assessment.tb09.tb09012;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS754BDTO;
import com.nanuri.rams.business.common.vo.IBIMS754BVO;
import com.nanuri.rams.business.common.vo.TB09012SVO;

/**
 * MO44020Service
 */
@Service
public interface TB09012Service {

    //
    List<IBIMS754BDTO> selectIBIMS754B(TB09012SVO param);

    List<IBIMS754BDTO> selectIBIMS755B(TB09012SVO param);

    List<IBIMS754BDTO> selectIBIMS756B(TB09012SVO param);

    public int saveCpdgList(IBIMS754BVO params);

    public int saveTransList(IBIMS754BVO params);

    public int saveErrList(IBIMS754BVO params);
}