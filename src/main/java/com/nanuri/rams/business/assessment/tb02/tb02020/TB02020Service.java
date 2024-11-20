package com.nanuri.rams.business.assessment.tb02.tb02020;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.TB02020SVO;

@Service
public interface TB02020Service {
  
  // 딜 정보 조회
  public List<TB02020SVO> getWfDealInfo(TB02020SVO dealInfo);

  // 맵 정보 조회
    public List<TB02020SVO> getMapInfo(Map<String, String> mapInfo);
  
  public List<TB02020SVO> getMapHisInfo(TB02020SVO dealInfo);
}
