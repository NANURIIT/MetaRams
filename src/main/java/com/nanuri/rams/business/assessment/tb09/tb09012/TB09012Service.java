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
    List<IBIMS754BDTO> cpdgSearch(TB09012SVO param);

    List<IBIMS754BDTO> cpdgTransSearch(TB09012SVO param);

    List<IBIMS754BDTO> cpdgErrSearch(TB09012SVO param);

    public int saveCpdgList(IBIMS754BVO params);

    public int saveTransList(IBIMS754BVO params);

    public int saveErrList(IBIMS754BVO params);
}