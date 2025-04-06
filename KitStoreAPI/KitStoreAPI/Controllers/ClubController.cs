using AutoMapper;
using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using KitStoreAPI.Repositories;
using KitStoreAPI.RequestHelpers;
using KitStoreAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KitStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubController(IClubRepository _clubRepository, IMapper _mapper, ImageService _imageService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Club>>> GetClubs()
        {
            var result = await _clubRepository.GetAllClubs();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Club>> GetClub([FromRoute] int id)
        {
            var club = await _clubRepository.GetAsync(id);
            if (club == null) return NotFound();
            return club;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Club>> CreateClub([FromForm] CreateClubDTO createClubDTO)
        {
            var club = _mapper.Map<Club>(createClubDTO);
            if (createClubDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(createClubDTO.File);
                if (imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }
                club.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                club.PublicId = imageResult.PublicId;
            }
            if (!await _clubRepository.CreateClub(club))
            {
                return BadRequest("Cannot create club");
            }
            var clubToReturn = _mapper.Map<ClubDTO>(club);
            return CreatedAtAction(nameof(GetClub), new { id = club.Id }, clubToReturn);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateClub([FromForm] UpdateClubDTO updateClubDTO)
        {
            var club = await _clubRepository.GetAsync(updateClubDTO.Id);
            if (club == null) return NotFound();
            _mapper.Map(updateClubDTO, club); // mapping from dto to the tracking club from the DB
            if (updateClubDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(updateClubDTO.File);
                if (imageResult.Error != null)
                {
                    return BadRequest($"Error {imageResult.Error.Message}");
                }
                if (!string.IsNullOrEmpty(club.PublicId))
                {
                    await _imageService.DeleteImageAsync(club.PublicId);
                }
                club.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                club.PublicId = imageResult.PublicId;
            }
            if (!await _clubRepository.UpdateClub(club)) return BadRequest("Problem updating club");
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteClub([FromRoute] int id)
        {
            var club = await _clubRepository.GetAsync(id);
            if (club == null) return NotFound();
            if (!string.IsNullOrEmpty(club.PublicId))
            {
                await _imageService.DeleteImageAsync(club.PublicId);
            }
            if (!await _clubRepository.DeleteClub(club)) BadRequest("Problem removing club");
            return NoContent();
        }
    }
}
