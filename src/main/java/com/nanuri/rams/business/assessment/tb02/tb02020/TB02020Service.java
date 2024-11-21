package com.nanuri.rams.business.assessment.tb02.tb02020;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.TB02020DTO;
import com.nanuri.rams.business.common.vo.TB02020SVO;

@Service
public interface TB02020Service {
  
  // 딜 정보 조회
  public List<TB02020DTO> getWfDealInfo(TB02020DTO dealInfo);

  // 맵 정보 조회
  public List<TB02020DTO> getMapInfo(Map<String, String> mapInfo);
  
  // 맵 이력 조회
  public List<TB02020DTO> getMapHisInfo(Map<String, String> mapHisInfo);
}
