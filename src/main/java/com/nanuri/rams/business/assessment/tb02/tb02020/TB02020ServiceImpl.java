package com.nanuri.rams.business.assessment.tb02.tb02020;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.TB02020DTO;
import com.nanuri.rams.business.common.mapper.TB02020Mapper;
import com.nanuri.rams.business.common.vo.TB02020SVO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB02020ServiceImpl implements TB02020Service {

  private final TB02020Mapper tb02020Mp;

  // 딜정보조회
  @Override
  public List<TB02020DTO> getWfDealInfo(TB02020DTO dealInfo) {
    
    List<TB02020DTO> dealList = tb02020Mp.getWfDealInfo(dealInfo);
    return dealList;
  }  

  // 맵정보조회
  @Override
  public List<TB02020DTO> getMapInfo(Map<String, String> mapInfo) {
    
    List<TB02020DTO> mapList = tb02020Mp.getMapInfo(mapInfo);
    return mapList;
  }

  // 맵이력조회
  @Override
  public List<TB02020DTO> getMapHisInfo(Map<String, String> mapHisInfo) {
    
    List<TB02020DTO> mapHisList = tb02020Mp.getMapHisInfo(mapHisInfo);
    return mapHisList;
  }  
}
