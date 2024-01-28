namespace API.DTO;

public class BasketDto
{
    public Guid BasketId { get; set; }
    public Guid BuyerId { get; set; }
    public List<BasketItemDto> BasketItems { get; set; }
}
