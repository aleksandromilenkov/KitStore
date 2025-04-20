using AutoMapper;
using Azure;
using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;
using KitStoreAPI.Extentions;
using KitStoreAPI.Interfaces;
using KitStoreAPI.RequestHelpers;
using KitStoreAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KitController(IKitRepository _kitRepository, ImageService _imageService, IMapper _mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PagedResult<Kit>>> GetKits([FromQuery] KitsQueryObject kitQueryObject)
        {
            var result = await _kitRepository.GetAllKits(kitQueryObject);
            Response.AddPaginationHeader(result.Pagination);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kit>> GetKit([FromRoute] int id)
        {
            var kit = await _kitRepository.GetAsync(id);
            if (kit == null) return NotFound();
            return kit;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Kit>> CreateKit([FromForm] CreateKitDTO createKitDTO)
        {
            var kit = _mapper.Map<Kit>(createKitDTO);
            if(createKitDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(createKitDTO.File);
                if (imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }
                kit.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                kit.PublicId = imageResult.PublicId;
            }
            if (!await _kitRepository.CreateKit(kit))
            {
                return BadRequest("Cannot create kit");
            }
            var kitToReturn = _mapper.Map<KitDTO>(kit);
            return CreatedAtAction(nameof(GetKit), new { id = kit.Id }, kitToReturn);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateKit([FromForm] UpdateKitDTO updateKitDTO)
        {
            var kit = await _kitRepository.GetAsync(updateKitDTO.Id);
            if (kit == null) return NotFound();
            _mapper.Map(updateKitDTO, kit); // mapping from dto to the tracking kit from the DB
            if (updateKitDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(updateKitDTO.File);
                if (imageResult.Error != null)
                {
                    return BadRequest($"Error {imageResult.Error.Message}");
                }
                if (!string.IsNullOrEmpty(kit.PublicId))
                {
                    await _imageService.DeleteImageAsync(kit.PublicId);
                }
                kit.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                kit.PublicId = imageResult.PublicId;
            }
            if(!await _kitRepository.UpdateKit(kit)) return BadRequest("Problem updating kit");
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteKit([FromRoute] int id)
        {
            var kit = await _kitRepository.GetAsync(id);
            if (kit == null) return NotFound();
            if (!string.IsNullOrEmpty(kit.PublicId))
            {
                await _imageService.DeleteImageAsync(kit.PublicId);
            }
            if(!await _kitRepository.DeleteKit(kit)) BadRequest("Problem removing product");
            return NoContent();
        }
    }
}
