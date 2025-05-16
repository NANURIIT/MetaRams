package com.nanuri.rams.business.common.mapper;

import java.util.List;

import com.nanuri.rams.business.common.dto.TEST101BDTO;
import com.nanuri.rams.business.common.vo.TEST101BVO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface TEST101BMapper {
    // 조회
    public TEST101BVO getDealInfo(TEST101BDTO test101bdto);

    // 저장
    public int saveDealInfo(TEST101BDTO test101bdto);

    // 최종여부 업데이트
    public int updateLstYn(String dealNo);

    // 일련번호 채번
    public String getSnSeq();

    // 딜번호 채번
    public String getDealNoSeq(TEST101BDTO test101bdto);
}
